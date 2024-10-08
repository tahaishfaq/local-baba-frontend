import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosBicycle } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import RestaurantCardSkeleton from "./skeletons/RestaurantCardDetailSkeleton"; // Import the skeleton component
import axiosInstance from "../utils/axiosInstance"; // Import the axios instance
import moment from "moment";
import { useResturant } from "../context/ResturantContext";

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

const RestaurantCard = () => {
  const navigate = useNavigate();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const { restaurants, loadingRestaurants, setSelectedRestaurant } =
    useResturant();

  const handleCardClick = (rest) => {
    setSelectedRestaurantId(rest?._id);
    setSelectedRestaurant(rest);
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
    <div className="lg:px-6 px-4 max-w-[1440px] mx-auto lg:py-16 py-0 lg:pb-28 pb-0">
      <h2 className="lg:text-[36px] text-2xl font-bold text-[#0D4041] lg:pb-10 pb-6">
        Top Restaurants
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-2">
        {loadingRestaurants
          ? Array.from({ length: 9 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : restaurants?.map((restaurant) => (
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
                    src={restaurant.image ? restaurant.image : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
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
                  {restaurant?.estimatedDeliveryTime && (
                    <span className="absolute bottom-0 right-0 text-white text-xs  font-medium px-3 py-[9px] time-chip backdrop-blur-2xl">
                      <span className="flex items-center gap-x-1">
                        <IoIosBicycle className="w-4 h-4" />{" "}
                        {restaurant?.estimatedDeliveryTime}
                      </span>
                    </span>
                  )}
                </div>
                <div className="py-4 flex flex-col items-start gap-y-2">
                  <h3 className="lg:text-lg text-base text-[#0D4041] font-semibold capitalize">
                    {restaurant.name ? restaurant.name : "---"}
                  </h3>
                  <p className="flex flex-wrap gap-2 text-xs font-light text-[#434343]">
                    {restaurant.cuisineType && restaurant.cuisineType.length > 0
                      ? restaurant.cuisineType[0]
                          .split(",")
                          .map((cuisine, index) => (
                            <span className="bg-gray-100 px-2 py-1 capitalize rounded-full" key={index}>{cuisine}</span>
                          ))
                      : "---"}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#0D4041] flex items-center gap-x-1.5">
                      <FaStar className="text-orange-500" />
                      {restaurant.ratings.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
