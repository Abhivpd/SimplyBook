import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel.config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Facilities</h2>
      <div className="grid grid-cols-5 gap-4">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  else return "Please select atleast one facility";
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
