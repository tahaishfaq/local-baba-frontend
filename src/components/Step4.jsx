import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SellerPopover from "./SellerPopover";
import { useSeller } from "../context/SellerContext"; // Import Formik context
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const Step4 = () => {
  const { formik, setCurrentStep } = useSeller(); // Use Formik context
  const progress = 80;
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      letterOfUnderstanding: true,
      agreement: true,
    });

    if (Object.keys(errors).length === 0) {
      if (localStorage.sellerToken) {
        await formik.submitForm();
        if (formik.isValid && !formik.isSubmitting) {
          setShowPopover(true);
        } else {
          toast.error("Please fill the required fields");

          setTimeout(() => {
            setCurrentStep(2);
          }, 2000);
        }
      } else {
        toast.error("Sorry! Your Email is not verified");
        setTimeout(() => {
          setCurrentStep(1);
        }, 2000);
      }
    } else {
      console.log("Errors:", errors);
    }
  };

  const handleClosePopover = () => {
    setShowPopover(false);
    setTimeout(() => {
      setCurrentStep(1)
      navigate("/");
    }, 500);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="max-w-4xl mx-auto lg:py-[70px] py-[30px] lg:px-0 px-4">
        {/* Step Header */}
        <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
          <div className="lg:space-y-[20px] space-y-[15px]">
            <h3 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
              Step 5
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
                {...formik.getFieldProps("agreement")}
                className="form-checkbox text-[#FE4101] rounded-[6px] border border-[#949494] focus:ring-0 h-6 w-6"
              />
              <span className="text-[#434343] font-normal text-[18px]">
                Confirm your agreement to give a 15% commission to Local Baba.
              </span>
            </label>
            {formik.touched.agreement && formik.errors.agreement && (
              <div className="text-red-500 text-sm">
                {formik.errors.agreement}
              </div>
            )}
          </div>

          {/* Letter of Understanding */}
          <div className="space-y-[20px] pt-10">
            <label className="block text-[#434343] font-medium text-xl">
              Letter of Understanding
            </label>
            <textarea
              rows={6}
              name="letterOfUnderstanding"
              {...formik.getFieldProps("letterOfUnderstanding")}
              className="w-full p-4 border border-[#E6E6E6] text-[#949494] font-normal text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-[#0D4041]"
              placeholder="Letter of Understanding"
            ></textarea>
            {formik.touched.letterOfUnderstanding &&
              formik.errors.letterOfUnderstanding && (
                <div className="text-red-500 text-sm">
                  {formik.errors.letterOfUnderstanding}
                </div>
              )}
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
    </>
  );
};

export default Step4;
