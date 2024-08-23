import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SellerPopover from "./SellerPopover";

const Step4 = () => {


  const [showPopover, setShowPopover] = useState(false);

  const handleNextClick = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      {/* Step Indicator */}
      <h3 className="text-xl font-normal text-[#0D4041] mb-4">Step 4</h3>
      <h2 className="text-2xl font-semibold text-[#0D4041] mb-8">Partner Contract</h2>
      <div className="mb-10"> 
        <ProgressBar/>
      </div>

      {/* Checkbox */}
      <div className="mb-8 ">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="form-checkbox text-[#FE4101] focus:ring-0"
          />
          <span className="text-[#434343] font-normal text-xl ">
            Confirm your agreement to give a 15% commission to Local Baba.
          </span>
        </label>
      </div>

      {/* Textarea */}
      <div className="mb-6 ">
        <label className="block text-[#434343] font-semibold text-xl mb-6">
          Letter Of Understanding
        </label>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 text-[#949494] font-normal text-sm rounded-lg focus:outline-none focus:ring-0"
          placeholder="Letter Of Understanding"
        ></textarea>
      </div>

      {/* Next Button */}
      <div className="mt-12">
        <button
          className="w-2/5 bg-[#FE4101] text-white py-2 rounded-full"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>

      {/* Render Popover */}
      {showPopover && <SellerPopover onClose={handleClosePopover} />}
    </div>

  );
};

export default Step4;
