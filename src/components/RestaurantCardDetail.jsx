import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dish1 from "../assets/card1.png";
import dish2 from "../assets/card2.png";
import dish3 from "../assets/card3.png";
import dish4 from "../assets/card4.png";
import dish5 from "../assets/card5.png";
import image from "../assets/Resimage.png";
import Popover from "../components/Popover";
import { IoIosBicycle } from "react-icons/io";
import RestaurantCardDetailSkeleton from "./skeletons/ResturantDetailSkeletons";

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
  const [loading, setLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as necessary
  }, []);

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

  if (loading) {
    return <RestaurantCardDetailSkeleton />;
  }

  return (
    <div className="space-y-[70px] max-w-[1440px] mx-auto py-[120px] font-figtree">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="space-y-4 ">
          <div className="flex justify-between items-center mx-4 border-b  pb-[40px]">
            <div className="flex items-center space-x-4">
              <img
                src={image}
                alt="Restaurant"
                className="w-[114px] h-[90px]  rounded-[13px]"
              />
              <div className="flex flex-col items-start gap-y-1">
                <h2 className="text-2xl font-semibold text-[#0D4041]">
                  Royal Tandoor
                </h2>
                <span className="text-[#434343] font-normal flex items-center gap-x-1 text-lg">
                  {" "}
                  <span>
                    <IoIosBicycle className="w-5 h-5" />{" "}
                  </span>
                  23-24 Min
                </span>
              </div>
            </div>
            <button className="text-[#949494] px-12 py-3 border rounded-full border-[#949494]">
              See All
            </button>
          </div>
          {/* <div className="border-t-2 mx-4 my-20"></div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[24px]  pt-[30px]">
            {row.map((item) => (
              <div
                key={item.id}
                className="bg-white drop-shadow-lg rounded-[14px] p-[14px] cursor-pointer border"
                onClick={() => handleCardClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover object-center rounded-[14px]"
                />
                <h3 className="text-lg font-semibold mt-4 text-[#0D4041]">{item.name}</h3>
                <p className="text-[#434343]">{item.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="my-4 text-[#FE4101] text-base font-medium border-[#D9D9D9] border py-2 px-4 rounded-[8px] w-full"
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
