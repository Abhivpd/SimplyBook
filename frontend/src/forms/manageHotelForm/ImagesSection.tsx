import { useFormContext } from "react-hook-form";
import { HotelType } from "../../utils/models";
import { PiImageSquare } from "react-icons/pi";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelType>();

  const existingImagesUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImagesUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImagesUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImagesUrls.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  alt="hotel-image"
                  className="min-h-full object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(event) => handleDelete(event, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImagesUrls?.length || 0);
              if (totalLength === 0) return "Please add atleast one images";
              else if (totalLength > 6)
                return "Maximum of six images can be selected";
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
