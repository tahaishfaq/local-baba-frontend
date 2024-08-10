import React from "react";
import { useNavigate } from "react-router-dom";
import restaurant1 from "../assets/Res1.jpeg";
import restaurant2 from "../assets/Res2.jpeg";
import restaurant3 from "../assets/Res3.jpeg";
import restaurant4 from "../assets/Res4.jpeg";
import restaurant5 from "../assets/Res5.jpeg";
import restaurant6 from "../assets/Res6.jpeg";
import restaurant7 from "../assets/Res7.jpeg";
import restaurant8 from "../assets/Res8.jpeg";
import restaurant9 from "../assets/Res9.jpeg";

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
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant3,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant4,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant5,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant6,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant7,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
    name: "Royal Tandoor",
    cuisine: "Mediterranean, Indian, Grills",
    rating: 4.5,
    deliveryTime: "22-34 min",
    imageUrl: restaurant8,
    tag: "",
    discount: "30% OFF",
  },
  {
    id: 2,
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

  const handleCardClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="p-6 min-h-screen mb-7">
      <h2 className="text-4xl font-bold text-[#0D4041] mb-4">
        Top Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleCardClick(restaurant.id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <div className="relative">
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              {restaurant.tag && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {restaurant.tag}
                </span>
              )}
              {restaurant.discount && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {restaurant.discount}
                </span>
              )}
              {restaurant.deliveryTime && (
                <span className="absolute bottom-0 right-0 bg-[#FFFFFF05] text-white text-xs font-bold px-2 py-1  rounded-md backdrop-blur-2xl">
                  🕒 {restaurant.deliveryTime}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 flex items-center">
                  ⭐ {restaurant.rating}
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
