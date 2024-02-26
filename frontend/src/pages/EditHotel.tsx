import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { HotelType } from "../utils/models";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  console.log(hotelId);

  const { data: hotelData } = useQuery(
    "fetchHitelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const hotelDetails: HotelType = hotelData?.hotel;

  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.updateHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel has been updated", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Unable to update the hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={hotelDetails}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
