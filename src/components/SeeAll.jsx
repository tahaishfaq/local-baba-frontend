
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
    {
      id: 1,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish1,
    },
    {
      id: 2,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish2,
    },
    {
      id: 3,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish3,
    },
    {
      id: 4,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish4,
    },
    {
      id: 5,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish5,
    },
    {
      id: 6,
      name: "Korean Fried Chicken",
      about:
        "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
      price: "₹1000",
      image: dish1,
    },
  ];

const FoodCard = ({ name, price, image, about }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div className="flex flex-col sm:flex-row">
      <img src={image} alt={name} className="rounded-lg w-full sm:w-1/3" />
      <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0 sm:ml-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-[#949494] font-normal text-sm mt-2">{about}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#434343] font-medium text-lg mt-2">{price}</p>
          <button className=" text-[#FE4101] px-4 py-2 rounded-full border-[#D9D9D9] mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SeeAllRestaurant = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const rows = [foodItems.slice(0, 5)];

  const handleAddToCart = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="space-y-12 p-4 sm:p-8 md:p-24">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row justify-between px-4 mb-10">
            <div className="flex items-center space-x-4">
              <img
                src={image}
                alt="Restaurant"
                className="w-20 h-16 sm:w-28 sm:h-24 rounded-xl"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D4041]">
                  Royal Tandoor
                </h2>
                <p className="text-[#434343] font-normal text-base sm:text-lg">
                  23-24 Min
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-x-4 sm:gap-x-24 ">
            <div className="mb-4 sm:mb-0">
              <p className="text-[#434343] font-semibold text-lg sm:text-xl">
                Delivery Time
              </p>
              <p className="text-[#949494] font-normal text-sm sm:text-base">
                40 mins
              </p>
            </div>

            <div className="hidden sm:block border-r border-[#9494944D]"></div>

            <div className="mb-4 sm:mb-0">
              <p className="text-[#434343] font-semibold text-lg sm:text-xl">
                Rating
              </p>
              <p className="text-[#949494] font-normal text-sm sm:text-base">
                4.9
              </p>
            </div>

            <div className="hidden sm:block border-r border-[#9494944D]"></div>

            <div className="mb-4 sm:mb-0">
              <p className="text-[#434343] font-semibold text-lg sm:text-xl">
                Prices Range
              </p>
              <p className="text-[#949494] font-normal text-sm sm:text-base">
                ₹1000
              </p>
            </div>

            <div className="hidden sm:block border-r border-[#9494944D]"></div>

            <div className="mb-4 sm:mb-0">
              <p className="text-[#434343] font-semibold text-lg sm:text-xl">
                Working Hours
              </p>
              <p className="text-[#949494] font-normal text-sm sm:text-base">
                Open from 12:00am to 9:00pm
              </p>
            </div>
          </div>

          <div className="my-4 sm:my-10">
            <p className="text-[#949494] font-normal text-sm">
              Indulge in the aromatic flavors of chicken biryani...
            </p>
          </div>

          <h1 className="text-[#434343] font-semibold text-2xl sm:text-3xl py-4 sm:py-10">
            Best Sellings
          </h1>
          <div className="border-t-2 my-4 sm:my-9"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 ">
            {row.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-xl rounded-xl p-4 cursor-pointer hover:border-[#FE4101CC] border-2"
                onClick={() => handleCardClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-4">{item.name}</h3>
                <p className="text-gray-500">{item.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="mt-4 text-[#FE4101] text-base font-semibold border-[#D9D9D9] border-2 py-2 px-4 rounded-xl w-full hover:border-[#FE4101]"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showPopover && <Popover onClose={handleClosePopover} />}

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-9">
            All Cuisines
          </h2>
          
        </div>

        <div className="flex flex-wrap gap-2 mb-9">
          {["Chicken", "Pizza", "Burger", "Sandwich", "Sushi", "Dessert"].map(
            (cuisine) => (
              <button
                key={cuisine}
                className="border border-gray-300 py-1 px-4 rounded-full text-sm hover:bg-[#FE4101] hover:text-white"
              >
                {cuisine}
              </button>
            )
          )}
        </div>
        <div className="border-t-2 mb-9"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {foodItems.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeAllRestaurant;