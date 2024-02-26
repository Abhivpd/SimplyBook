import { Request, Response, Router } from "express";
import multer from "multer";
import { HotelType } from "../utils/model";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { uploadImages } from "../utils/uploadImages";

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
      const newHotel: HotelType = req.body;

      //   upload images to the cloudinary
      const imageUrls = await uploadImages(imageFiles);
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
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Hotel",
    });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const hotelId = req.params.id;

  try {
    const hotel = await Hotel.findOne({ _id: hotelId, userId: req.userId });

    res.status(200).json({ hotel });
  } catch (error) {
    res.status(500).json({ error: "Error fetching hotel" });
  }
});

router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const imageFiles = req.files as Express.Multer.File[];

      const updatedImageUrls = await uploadImages(imageFiles);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).json({ hotel });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
