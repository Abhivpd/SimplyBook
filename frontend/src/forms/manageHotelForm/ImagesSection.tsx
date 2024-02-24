import { useFormContext } from "react-hook-form";
import { HotelType } from "../../utils/models";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
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
