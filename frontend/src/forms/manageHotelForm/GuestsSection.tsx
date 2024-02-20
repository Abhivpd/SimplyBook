import { useFormContext } from "react-hook-form";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-4 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border rounded w-full py-2 px-4 font-normal"
            min={1}
            {...register("adultCount", {
              required: "This is a required field",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          children
          <input
            type="number"
            className="border rounded w-full py-2 px-4 font-normal"
            min={0}
            {...register("childCount", {
              required: "This is a required field",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
