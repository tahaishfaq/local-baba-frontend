import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Popover = ({ onClose, item }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart, calculateItemTotal } = useContext(CartContext);

  // Function to handle the selection of extras
  const toggleExtra = (extraItem) => {
    setSelectedExtras((prevExtras) => {
      const isSelected = prevExtras.find((e) => e._id === extraItem._id);
      if (isSelected) {
        return prevExtras.filter((e) => e._id !== extraItem._id);
      } else {
        return [...prevExtras, extraItem];
      }
    });
  };

  // Increase quantity of the item
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity of the item
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add the item and selected extras to the cart
  const handleAddToCart = () => {
    addToCart({ ...item, quantity, extras: selectedExtras }, quantity, selectedExtras);
    onClose();
  };

  // Calculate total price including extras
  const calculateTotalPrice = () => {
    const extrasTotal = selectedExtras.reduce((total, extra) => total + extra.price, 0);
    return (item.basePrice + extrasTotal) * quantity;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col">
        <div className="bg-white flex flex-col sm:flex-row max-w-4xl w-full sm:w-auto rounded-xl shadow-lg">
          <div className="w-full sm:w-1/2 p-4">
            <img
              src={item?.image}
              alt="Dish"
              className="w-96 h-auto rounded-lg object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#0D4041]">
                {item.itemName}
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
                src={item?.restaurant?.image}
                alt={item?.restaurant?.name}
                className="w-16 h-16 rounded-lg object-cover bg-gray-100"
              />
              <div>
                <h3 className="font-semibold text-[#0D4041] text-base sm:text-lg">
                  {item?.restaurant?.name}
                </h3>
                <p className="text-[#949494] text-xs sm:text-sm">22-34 Min</p>
              </div>
            </div>

            {item?.extras?.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-[#0D4041] font-semibold text-base sm:text-lg mb-2">
                  Customize as per your taste
                </h3>
                <ul className="space-y-2">
                  {item.extras.map((extraItem, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[#0D4041] font-medium">
                          {extraItem.name}
                        </span>
                      </div>
                      <span className="text-[#0D4041]">+₹{extraItem.price}</span>
                      <input
                        type="checkbox"
                        checked={selectedExtras.some((e) => e._id === extraItem._id)}
                        onChange={() => toggleExtra(extraItem)}
                        className="form-checkbox h-5 w-5 text-[#FE4101] cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
              <div className="flex items-center space-x-1 mb-4 sm:mb-0">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 border rounded-lg text-[#FE4101] border-[#D9D9D9]"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-[#0D4041]">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 border rounded-lg text-[#FE4101] border-[#D9D9D9]"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#FE4101] text-white px-4 sm:px-6 py-3 rounded-full flex items-center justify-between w-full sm:w-auto space-x-2"
              >
                <span>Add To Cart</span>
                <span className="font-semibold">
                  ₹{calculateTotalPrice().toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
