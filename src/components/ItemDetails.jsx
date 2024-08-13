import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Dish1 from "../assets/Dish1.png";
import Dish2 from "../assets/Dish2.png";
import Dish3 from "../assets/Dish3.png";

const foodItems = [
  {
    id: 1,
    discription:
      "Indulge in the aromatic flavors of chicken biryani, a beloved dish.",
    name: "Chicken Biryani",
    price: "₹100",
    image: Dish1,
  },
  {
    id: 2,
    discription:
      "Indulge in the aromatic flavors of chicken biryani, a beloved dish.",
    name: "Korean Fried Chicken",
    price: "₹1000",
    image: Dish2,
  },
  {
    id: 3,
    discription:
      "Indulge in the aromatic flavors of chicken biryani, a beloved dish.",
    name: "Pizza",
    price: "₹1000",
    image: Dish3,
  },
];

const CartItem = ({ name, price, image, discription }) => (
  <div className="flex items-center space-x-4 p-4 border-b shadow-md rounded-lg">
    <img
      src={image}
      alt={name}
      className="w-[120] h-[106] object-cover rounded-lg"
    />
    <div>
      <h3 className="text-sm font-semibold text-[#434343] mb-1">{name}</h3>
      <p className="text-[#949494] font-normal text-xs mb-5">{discription}</p>
      <p className="text-sm font-medium text-[#434343]">{price}</p>
    </div>
    <input
      type="number"
      min="1"
      className="w-12 text-center border rounded-md"
      defaultValue="1"
    />
  </div>
);

const FoodCard = ({ name, price, image }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <img
      src={image}
      alt={name}
      className="w-full h-[182px] object-cover rounded-lg mb-5"
    />
    <h3 className=" text-[#0D4041] text-xl font-semibold mb-3">{name}</h3>
    <p className="text-[#434343] font-normal text-base mb-5">{price}</p>
    <button className="mt-4 bg-white text-[#FE4101] py-2 px-4 border border-[#D9D9D9] rounded-lg w-full">
      Add to Cart
    </button>
  </div>
);

const FoodCard2 = ({ name, price, image, discription }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
    <img
      src={image}
      alt={name}
      className="w-[206px] h-[182px] object-cover rounded-lg mr-5"
    />
    <div className="flex-1">
      <h3 className="text-[#434343] text-base font-semibold mb-2">{name}</h3>
      <p className="text-[#949494] font-normal text-sm mb-6">{discription}</p>
      <div className="flex items-center justify-between">
        <p className="text-[#434343] font-medium text-lg">{price}</p>
        <button className="bg-white font-semibold text-base text-[#FE4101] py-2 px-4 border border-[#D9D9D9] rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const ItemDetails = () => (
  <div className=" mx-auto p-6">
    <div className=" grid grid-cols-2  space-x-2 w-full ">
      <div className="">
        <div className="mb-14">
          <h1 className="  text-4xl font-bold text-[#0D4041] mb-14">
            Chicken Biryani
          </h1>
          <h3 className="text-[#434343] font-semibold text-base mb-3">
            Description
          </h3>
          <p className="text-[#949494] font-medium text-sm mb-10">
            Indulge in the aromatic flavors of chicken biryani, a beloved dish
            that captivates taste buds with its fragrant spices and tender meat.
            Savor every bite of the perfectly cooked basmati rice layered with
            succulent chicken pieces, caramelized onions, and a blend of
            traditional spices. Experience the rich and satisfying taste of this
            classic Indian dish that never fails to impress.
            <span className="text-[#FE4101] font-medium text-sm">
              Read more...
            </span>
          </p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button className="bg-white border border-[#FE4101] text-[#FE4101] py-4 px-36 font-medium text-sm rounded-full">
              Delivery
            </button>
            <button className="bg-[#FE4101] text-white border border-[#FE4101] py-4 px-36 font-medium text-sm rounded-full">
              Self Pickup
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-9">
          <h2 className="text-4xl font-semibold text-[#434343]">
            Best Sellings
          </h2>
          <button className="text-[#949494] font-medium text-sm border border-[#949494] rounded-full px-4 py-3">
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {foodItems?.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className=" text-[#434343] text-3xl font-semibold mb-6">Cart</h2>
        <div className="space-y-4">
          {foodItems?.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="mt-4 p-4 bg-[#FE4101E5] rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">Sub-Total</span>
            <span className="text-sm font-medium text-white">₹1000</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">
              Delivery Charges
            </span>
            <span className="text-sm font-medium text-white">₹100</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">Discount</span>
            <span className="text-sm font-medium text-white">₹100</span>
          </div>
          <div className="w-full border-t border-[#FFFFFF] my-4"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-medium text-white">Total</span>
            <span className="text-lg font-medium text-white">₹1000</span>
          </div>
          <button
            // onClick={handlePlaceOrder}
            className="bg-white text-[#FE4101] font-medium text-base py-2 px-4 rounded-full w-full"
          >
            Place My Order
          </button>
        </div>
      </div>
    </div>

    <div>
      <div className="flex justify-between items-center mb-4 mt-6">
        <h2 className="text-[#434343] font-bold text-3xl">All Cuisines</h2>
        <button className="text-red-500">See All</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Chicken", "Pizza", "Burger", "Sandwich", "Sushi", "Dessert"].map(
          (cuisine) => (
            <button
              key={cuisine}
              className="border border-gray-300 hover:bg-[#FE4101] hover:text-white py-1 px-4 rounded-full text-sm"
            >
              {cuisine}
            </button>
          )
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {foodItems.map((item) => (
          <FoodCard2 key={item.id} {...item} />
        ))}
      </div>
    </div>
  </div>
);

export default ItemDetails;
