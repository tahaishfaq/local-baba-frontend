import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosBicycle } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import RestaurantCardSkeleton from "./skeletons/RestaurantCardDetailSkeleton"; // Import the skeleton component
import axiosInstance from "../utils/axiosInstance"; // Import the axios instance
import moment from "moment";
import {  useResturant } from "../context/ResturantContext";

// const restaurants = [
//   {
//     id: 1,
//     name: "Royal Tandoor",
//     cuisine: "Mediterranean, Indian, Grills",
//     rating: 4.5,
//     deliveryTime: "22-34 min",
//     imageUrl: restaurant1,
//     tag: "Free delivery", // Optional, can be empty string if not applicable
//     discount: "", // Optional, can be empty string if not applicable
//   },]


const BestSellingResturant = () => {
  
  const navigate = useNavigate();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const {topRestaurants, loadingRestaurants, setSelectedRestaurant} = useResturant()



  const handleCardClick = (rest) => {
    setSelectedRestaurantId(rest?._id);
    setSelectedRestaurant(rest)
    setTimeout(() => {
      navigate(`/see-resturant-products/${rest?._id}`);
    }, 1000);
  };

  const formatOperatingHours = (hours) => {
    const [start, end] = hours.split(" - ");
    const formattedStart = moment(start, "hh:mm A").format("hA");
    const formattedEnd = moment(end, "hh:mm A").format("hA");
    return `${formattedStart} - ${formattedEnd}`;
  };

  return (
    <div className="lg:px-6 px-4 max-w-[1440px] mx-auto py-16">
      <h2 className="lg:text-[36px] text-2xl font-bold text-[#0D4041] lg:pb-10 pb-6">
        Best Selling Restaurants
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-2">
        {loadingRestaurants
          ? Array.from({ length: 9 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : topRestaurants?.map((restaurant) => (
              <div
                key={restaurant._id}
                onClick={() => handleCardClick(restaurant)}
                className={`bg-white rounded-[16px] drop-shadow-lg overflow-hidden cursor-pointer border ${
                  selectedRestaurantId === restaurant._id
                    ? "border-[#FE4101]"
                    : ""
                } p-[14px]`}
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full lg:h-64 h-32 object-center object-cover rounded-xl"
                  />
                  {restaurant.tag && (
                    <span className="absolute top-2 left-2 bg-[#007AFF] text-white text-xs font-semibold px-2 py-1 rounded-full">
                      <span className="flex items-center gap-x-1">
                        <img src={freeDelivery} alt="-" className="" />
                        {restaurant.tag}
                      </span>
                    </span>
                  )}
                  {restaurant.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {restaurant.discount}
                    </span>
                  )}
                  {restaurant.operatingHours && (
                    <span className="absolute bottom-0 right-0 text-white text-xs font-medium px-3 py-[9px] time-chip backdrop-blur-2xl">
                      <span className="flex items-center gap-x-1">
                        <IoIosBicycle className="w-4 h-4" />{" "}
                        {formatOperatingHours(restaurant.operatingHours)}
                      </span>
                    </span>
                  )}
                </div>
                <div className="py-4 flex flex-col items-start gap-y-2">
                  <h3 className="lg:text-lg text-base text-[#0D4041] font-semibold capitalize">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm font-light text-[#434343]">
                    {restaurant.cuisineType}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D4041] flex items-center gap-x-1.5">
                      <FaStar className="text-orange-500" />
                      {restaurant.ratings.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BestSellingResturant;
