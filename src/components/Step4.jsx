import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SellerPopover from "./SellerPopover";
import { useSeller } from "../context/SellerContext"; // Import Formik context

const Step4 = () => {
  const { formik } = useSeller(); // Use Formik context
  const progress = 80;
  const [showPopover, setShowPopover] = useState(false);

  const handleNextClick = async () => {
    // Submit the form using Formik
    await formik.submitForm();

    // After successful form submission, show the popover
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <div className="max-w-4xl mx-auto lg:py-[70px] py-[30px] lg:px-0 px-4">
      {/* Step Header */}
      <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
        <div className="lg:space-y-[20px] space-y-[15px]">
          <h3 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
            Step 4
          </h3>
          <h2 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
            Partner Contract
          </h2>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Agreement Checkbox */}
      <div className="space-y-[30px]">
        <div className="space-y-[20px]">
          <label className="flex items-center space-x-2.5">
            <input
              type="checkbox"
              name="agreement"
              checked={formik.values.agreement}
              onChange={formik.handleChange}
              className="form-checkbox text-[#FE4101] rounded-[6px] border border-[#949494] focus:ring-0 h-6 w-6"
            />
            <span className="text-[#434343] font-normal text-[18px]">
              Confirm your agreement to give a 15% commission to Local Baba.
            </span>
          </label>
        </div>

        {/* Letter of Understanding */}
        <div className="space-y-[20px] pt-10">
          <label className="block text-[#434343] font-medium text-xl">
            Letter of Understanding
          </label>
          <textarea
            rows={6}
            name="letterOfUnderstanding"
            value={formik.values.letterOfUnderstanding}
            onChange={formik.handleChange}
            className="w-full p-4 border border-[#E6E6E6] text-[#949494] font-normal text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-[#0D4041]"
            placeholder="Letter of Understanding"
          ></textarea>
        </div>

        {/* Next Button */}
        <div className="mt-[50px]">
          <button
            className="bg-[#FE4101] text-white py-[16px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] transition duration-300"
            onClick={handleNextClick}
            aria-label="Next Step"
            type="button"
          >
            Next
          </button>
        </div>
      </div>

      {/* Render Popover */}
      {showPopover && <SellerPopover onClose={handleClosePopover} />}
    </div>
  );
};

export default Step4;
