import React from 'react';
import image1 from '../assets/Summary1.png'
import image2 from '../assets/Summary2.png'

const OrderSummary = () => {
  return (
    <div className=" mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Shipping Address */}
      <div className="col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            placeholder="Enter Street Address"
            className="w-full border border-gray-300 p-3 rounded-md mb-4"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full border border-gray-300 p-3 rounded-md"
            />
            <select className="w-full border border-gray-300 p-3 rounded-md">
              <option>Select</option>
              <option>State 1</option>
              <option>State 2</option>
              <option>State 3</option>
            </select>
          </div>
          <button className="bg-[#FE4101] text-white py-3 px-6 rounded-full">
            Save Address
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Additional Info</h2>
          <textarea
            placeholder="Notes About Your Order. E.G. Special Notes For Delivery"
            className="w-full border border-gray-300 p-3 rounded-md h-32"
          ></textarea>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        {/* Items */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={image1}
                alt="Chicken Biryani"
                className="w-16 h-16 rounded-md mr-4"
              />
              <div>
                <h3 className="text-sm font-semibold">Chicken Biryani</h3>
                <p className="text-xs text-gray-500">A delicious Biryani.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">₹1000</p>
              <input
                type="number"
                defaultValue="1"
                className="w-12 border border-gray-300 rounded-md p-1 text-center"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={image2}
                alt="Chicken Biryani"
                className="w-16 h-16 rounded-md mr-4"
              />
              <div>
                <h3 className="text-sm font-semibold">Chicken Biryani</h3>
                <p className="text-xs text-gray-500">A delicious Biryani.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">₹1000</p>
              <input
                type="number"
                defaultValue="1"
                className="w-12 border border-gray-300 rounded-md p-1 text-center"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-sm mb-4">
          <div className="flex justify-between">
            <p>Sub-Total</p>
            <p>₹1000</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p>₹10</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>₹10</p>
          </div>
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>₹1000</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[#FE4101E5] p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-4 text-white">Payment Method</h3>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="radio" name="payment" className="form-radio text-[#FE4101E5]" />
              <span className="ml-2 text-white">Cash On Delivery</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
                <input type="radio" name="payment" className="form-radio text-[#FE4101E5]" />
              <span className="ml-2 text-white">Razor Pay</span>
            </label>
          </div>
          <button className="w-full bg-white text-[#FE4101E5] py-3 rounded-md">
            Place My Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
