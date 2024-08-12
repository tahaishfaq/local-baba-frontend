import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dish1 from "../assets/card1.png";
import dish2 from "../assets/card2.png";
import dish3 from "../assets/card3.png";
import dish4 from "../assets/card4.png";
import dish5 from "../assets/card5.png";
import image from "../assets/Resimage.png";
import Popover from "../components/Popover";

const foodItems = [
  { id: 1, name: "Chicken Biryani", price: "₹100", image: dish1 },
  { id: 2, name: "Chicken Biryani", price: "₹100", image: dish2 },
  { id: 3, name: "Chicken Biryani", price: "₹100", image: dish3 },
  { id: 4, name: "Chicken Biryani", price: "₹100", image: dish4 },
  { id: 5, name: "Chicken Biryani", price: "₹100", image: dish5 },
  { id: 6, name: "Chicken Biryani", price: "₹100", image: dish1 },
  { id: 7, name: "Chicken Biryani", price: "₹100", image: dish2 },
  { id: 8, name: "Chicken Biryani", price: "₹100", image: dish3 },
  { id: 9, name: "Chicken Biryani", price: "₹100", image: dish4 },
  { id: 10, name: "Chicken Biryani", price: "₹100", image: dish5 },
  { id: 11, name: "Chicken Biryani", price: "₹100", image: dish1 },
  { id: 12, name: "Chicken Biryani", price: "₹100", image: dish2 },
  { id: 13, name: "Chicken Biryani", price: "₹100", image: dish3 },
  { id: 14, name: "Chicken Biryani", price: "₹100", image: dish4 },
  { id: 15, name: "Chicken Biryani", price: "₹100", image: dish5 },
];

const RestaurantCardDetail = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const rows = [
    foodItems.slice(0, 5),
    foodItems.slice(5, 10),
    foodItems.slice(10, 15),
  ];

  const handleAddToCart = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleRestaurantClick = () => {
    navigate('/SeeAll'); // Navigate to SeeAllRestaurant component
  };

  return (
    <div className="space-y-12">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="space-y-4 my-10">
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center space-x-4">
              <img
                src={image}
                alt="Restaurant"
                className="w-28 h-24 rounded-xl"
              />
              <div>
                <h2
                  className="text-2xl font-bold text-[#0D4041] cursor-pointer"
                  onClick={handleRestaurantClick} // Add click handler here
                >
                  Royal Tandoor
                </h2>
                <p className="text-[#434343] font-normal text-lg">23-24 Min</p>
              </div>
            </div>
            <button className="text-[#949494] px-8 py-3 border rounded-full border-[#949494]">
              See All
            </button>
          </div>
          <div className="border-t-2 mx-4 my-9"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4">
            {row.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
                onClick={() => handleCardClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
                <p className="text-gray-500">{item.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="mt-4 text-[#FE4101] text-base font-semibold border-[#D9D9D9] border-2 py-2 px-4 rounded-xl w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showPopover && <Popover onClose={handleClosePopover} />}
    </div>
  );
};

export default RestaurantCardDetail;
