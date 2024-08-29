import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";

const SellerPopover = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white px-6 py-12 rounded-[20px] shadow-lg w-full max-w-sm mx-3 lg:max-w-[650px] relative">
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

        {/* Check Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center">
            <BsPatchCheckFill className="lg:w-16 lg:h-16 h-14 w-14 text-[#04d668]" />
          </div>
        </div>

        {/* Message Content */}
        <div className="text-center flex flex-col items-center gap-y-3">
          <h2 className="lg:text-[20px] text-[14px] font-semibold text-[#0D4041] ">
            Congratulations, your Seller Application has been submitted!
          </h2>
          <p className="text-[#949494] font-normal text-[12px] lg:text-sm">
            We have received your seller application. You will get a reply from
            us within 12 hours.
          </p>
          <button
            className="bg-[#FE4101] text-white lg:py-[16px] py-[11px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] lg:text-base text-xs transition duration-300 mt-6"
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
