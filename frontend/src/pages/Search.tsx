import { useQuery } from "react-query";
import { useSearchContext } from "../context/searchContext";
import * as apiClient from "../api-client";
import React, { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Paginator from "../components/Paginator";
import StarRatingFilter from "../components/starRatingFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    page: page.toString(),
    stars: selectedStars,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>

          {/* {sort option} */}
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Paginator
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChanges={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
