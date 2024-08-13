import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosBicycle, IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import RestaurantCardSkeleton from "./skeletons/RestaurantCardDetailSkeleton"; // Import the skeleton component
import restaurant1 from "../assets/Res1.jpeg";
import restaurant2 from "../assets/Res2.jpeg";
import restaurant3 from "../assets/Res3.jpeg";
import restaurant4 from "../assets/Res4.jpeg";
import restaurant5 from "../assets/Res5.jpeg";
import restaurant6 from "../assets/Res6.jpeg";
import restaurant7 from "../assets/Res7.jpeg";
import restaurant8 from "../assets/Res8.jpeg";
import restaurant9 from "../assets/Res9.jpeg";
import freeDelivery from "../assets/Vector (12).png";

const restaurants = [
  {
    id: 1,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant1,
    tag: "Free delivery", // Optional, can be empty string if not applicable
    discount: "", // Optional, can be empty string if not applicable
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant2,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 3,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant3,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 4,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant4,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 5,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant5,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 6,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant6,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 7,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant7,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 8,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant8,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 9,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant9,
    tag: "",
    discount: "30% OFF",
  },
];

const RestaurantCard = () => {
  const navigate = useNavigate();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second fetch time
  }, []);

  const handleCardClick = (id) => {
    setSelectedRestaurantId(id);
    setTimeout(() => {
      navigate(`/restaurant/${id}`);
    }, 1000);
  };

  return (
    <div className="px-6 min-h-screen mb-7 max-w-[1440px] mx-auto py-6">
      <h2 className="text-[36px] font-bold text-[#0D4041] pb-10">
        Top Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleCardClick(restaurant?.id)}
                className={`bg-white rounded-[16px] drop-shadow-lg overflow-hidden cursor-pointer border ${
                  selectedRestaurantId === restaurant.id
                    ? "border-[#FE4101]"
                    : ""
                } p-[14px]`}
              >
                <div className="relative">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-64 object-cover rounded-xl"
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
                  {restaurant.deliveryTime && (
                    <span className="absolute bottom-0 right-0 text-white text-xs font-medium px-3 py-[9px] time-chip backdrop-blur-2xl">
                      <span className="flex items-center gap-x-1">
                        <IoIosBicycle className="w-4 h-4" />{" "}
                        {restaurant.deliveryTime}
                      </span>
                    </span>
                  )}
                </div>
                <div className="py-4 flex flex-col items-start gap-y-2">
                  <h3 className="text-lg text-[#0D4041] font-semibold">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm font-light text-[#434343]">
                    {restaurant.cuisine}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D4041] flex items-center gap-x-1.5">
                      <FaStar className="text-orange-500" />
                      {restaurant.rating}
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
