import React, { useState } from "react";
import image from "../assets/Resimage.png"; // Update the path if needed
import image2 from "../assets/popoverimage.png";

const Popover = ({ onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white flex flex-col sm:flex-row max-w-4xl w-full sm:w-auto rounded-xl shadow-lg">
        <div className="w-full sm:w-1/2 p-4">
          <img
            src={image2}
            alt="Dish"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#0D4041]">
              Chicken Biryani
            </h2>
            <button
              onClick={onClose}
              className="text-[#949494] text-2xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="flex items-center space-x-4 mb-4 sm:mb-6 border-2 rounded-xl shadow-md p-2">
            <img
              src={image}
              alt="Dish"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-[#0D4041] text-base sm:text-lg">
                Royal Tandoor
              </h3>
              <p className="text-[#949494] text-xs sm:text-sm">22-34 Min</p>
            </div>
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="text-[#0D4041] font-semibold block mb-2 text-sm sm:text-base">
              Special Request
            </label>
            <textarea
              className="w-full border rounded-lg p-2 text-gray-700"
              placeholder="Write Here"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={decreaseQuantity}
                className="px-4 py-2 border rounded-lg text-[#FE4101] border-[#D9D9D9]"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold text-[#0D4041]">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-4 py-2 border rounded-lg text-[#FE4101] border-[#D9D9D9]"
              >
                +
              </button>
            </div>
            <button className="bg-[#FE4101] text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-between w-full sm:w-auto space-x-2">
              <span>Add To Cart</span>
              <span className="font-semibold">₹{1000 * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;