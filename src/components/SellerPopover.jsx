import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";

const SellerPopover = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Checkmark Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center">
            <BsPatchCheckFill className="w-20 h-20  text-[#04d668]" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#0D4041] mb-4">
            Congratulations your Seller Application has been submitted!
          </h2>
          <p className="text-[#949494] font-normal text-sm mb-9">
            We have received your seller application. You will get a reply from
            us after 12 hours.
          </p>
        </div>

        {/* OK Button */}
        <div className="text-center ">
          <button
            className="bg-[#FE4101] text-white font-medium text-base py-2 px-8 rounded-full w-2/5 "
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerPopover;
