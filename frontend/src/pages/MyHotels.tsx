import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { HotelType } from "../utils/models";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery("fetchHotels", apiClient.fetchHotels, {
    onError: () => {},
  });

  const hotels: HotelType[] = hotelData?.hotels || [];

  if (hotels.length === 0) {
    return <span>No Hotels Found!</span>;
  }

  return (
    <main className="space-y-4">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </header>
      <section className="grid grid-cols-1 gap-8">
        {hotels?.map((hotel) => (
          <div
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-6"
            key={hotel._id}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-4 flex items-center">
                <BsMap className="mr-2" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-4 flex items-center">
                <BsBuilding className="mr-2" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-4 flex items-center">
                <BiMoney className="mr-2" />₹ {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-4 flex items-center">
                <BiHotel className="mr-2" />
                {hotel.adultCount} adults, {hotel.childCount} childs
              </div>
              <div className="border border-slate-300 rounded-sm p-4 flex items-center">
                <BiStar className="mr-2" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyHotels;
