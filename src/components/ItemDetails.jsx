import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Dish1 from "../assets/Dish1.png";
import Dish2 from "../assets/Dish2.png";
import Dish3 from "../assets/Dish3.png";

const foodItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: "₹100",
    image: Dish1,
  },
  {
    id: 2,
    name: "Korean Fried Chicken",
    price: "₹1000",
    image: Dish2,
  },
  {
    id: 3,
    name: "Pizza",
    price: "₹100",
    image: Dish3,
  },
];

const CartItem = ({ name, price, image }) => (
  <div className="flex items-center space-x-4 p-4 border-b">
    <img src={image} alt={name} className="w-16 h-16 object-cover rounded-lg" />
    <div>
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{price}</p>
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
      className="w-full h-32 object-cover rounded-lg"
    />
    <h3 className="text-lg font-semibold mt-4">{name}</h3>
    <p className="text-gray-500">{price}</p>
    <button className="mt-4 bg-[#FE4101] text-white py-2 px-4 rounded-full w-full">
      Add to Cart
    </button>
  </div>
);

const ItemDetails = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handlePlaceOrder = () => {
    navigate("/order-summary"); // Navigate to the OrderSummary component
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-2 space-x-2 w-full">
        <div className="">
          <h1 className="text-4xl font-bold text-[#0D4041] mb-2">
            Chicken Biryani
          </h1>
          <p className="text-gray-700 mb-4">
            Indulge in the aromatic flavors of chicken biryani, a beloved dish
            that captures the heart with its fragrant spices and tender chicken.
            Served with a side of raita, this dish is a true delight for your
            taste buds.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button className="bg-white border border-[#FE4101] text-[#FE4101] py-2 px-4 rounded-full">
              Delivery
            </button>
            <button className="bg-[#FE4101] text-white border border-[#FE4101] py-2 px-4 rounded-full">
              Self Pickup
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#434343]">
              Best Sellings
            </h2>
            <button className="text-[#949494] border border-[#949494] rounded-full px-4 py-2">
              See All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {foodItems.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Cart</h2>
          <div className="space-y-4">
            {foodItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-4 p-4 bg-[#FE4101E5] rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white">Sub-Total</span>
              <span className="text-sm font-semibold text-white">₹1000</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white">
                Delivery Charges
              </span>
              <span className="text-sm font-semibold text-white">₹100</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white">Discount</span>
              <span className="text-sm font-semibold text-white">₹100</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-white">Total</span>
              <span className="text-xl font-bold text-white">₹1000</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-white text-[#FE4101E5] py-2 px-4 rounded-full w-full"
            >
              Place My Order
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 mt-6">
          <h2 className="text-2xl font-semibold">All Cuisines</h2>
          <button className="text-red-500">See All</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Chicken", "Pizza", "Burger", "Sandwich", "Sushi", "Dessert"].map(
            (cuisine) => (
              <button
                key={cuisine}
                className="border border-gray-300 py-1 px-4 rounded-full text-sm"
              >
                {cuisine}
              </button>
            )
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {foodItems.map((item) => (
            <FoodCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
