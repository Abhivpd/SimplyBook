import { Request, Response, Router } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../utils/model";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/add",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      console.log(imageFiles);
      const newHotel: HotelType = req.body;

      //   upload images to the cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        console.log(res);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      console.log(imageUrls);

      //adding the saved cloudinary urls to the request
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      //   adding the hotel to database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).json({ message: "You have added a new hotel" });
    } catch (error) {
      console.log(`error creating hotel: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json({hotels});
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Hotel",
    });
  }
});

export default router;
