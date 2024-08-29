import React from "react";
import ProgressBar from "./ProgressBar";
import { FaFileUpload } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { useSeller } from "../context/SellerContext";

const BecomeSeller = ({ onNext }) => {
  const { formik } = useSeller(); // Use the context to access Formik

  // Handle image change for file input
  const handleImageChange = (event, fieldName) => {
    if (event.target.files && event.target.files.length > 0) {
      formik.setFieldValue(fieldName, event.target.files[0]);
    }
  };

  // Handle file drop for drag and drop
  const handleDrop = (event, fieldName) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      formik.setFieldValue(fieldName, event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div className="flex justify-center items-center lg:py-[70px] py-[10px]">
      <div className="lg:p-8 p-4 max-w-4xl w-full">
        <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
          <div className="lg:space-y-[20px] space-y-[15px]">
            <h2 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
              Step 1
            </h2>
            <h3 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
              Seller (Partner) Registration
            </h3>
          </div>
          <ProgressBar progress={20} />
        </div>

        <div className="space-y-[20px]">
          <h4 className="text-xl font-medium text-[#434343]">Basic Info</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Owner Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <input
              type="text"
              name="phone"
              placeholder="Mobile No."
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <input
              type="text"
              name="noOfEmployees"
              placeholder="No. of Employees"
              value={formik.values.noOfEmployees}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <select
              name="cuisineType"
              value={formik.values.cuisineType}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            >
              <option value="" disabled>
                Select Cuisine Type
              </option>
              <option>Italian</option>
              <option>Chinese</option>
              <option>Indian</option>
              {/* Add more options as needed */}
            </select>
            <input
              type="text"
              name="operatingHours"
              placeholder="Operating Hours"
              value={formik.values.operatingHours}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
            <input
              type="text"
              name="estimatedDeliveryTime"
              placeholder="Estimated Delivery Time"
              value={formik.values.estimatedDeliveryTime}
              onChange={formik.handleChange}
              className="border text-[#949494] text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
            />
          </div>

          <div className="space-y-[20px] pt-5">
            <h4 className="text-lg font-semibold text-[#434343]">
              Aadhar & Pan Document
            </h4>

            <div
              className="border-dashed border-2 border-gray-300 rounded-[19px] px-8 py-6 text-center w-full sm:max-w-sm cursor-pointer"
              onDrop={(e) => handleDrop(e, "adharDoc")}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("adharDocUpload").click()}
            >
              {formik.values.adharDoc ? (
                <img
                  src={URL.createObjectURL(formik.values.adharDoc)}
                  alt="Uploaded"
                  className="mx-auto mb-4 max-h-40"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF1EB] mb-[15px]">
                    <CiFileOn className="text-[#FE4101] w-6 h-6" />
                  </div>
                  <p className="text-[#FE4101] font-normal text-lg">
                    Click to Upload{" "}
                    <span className="text-[#636363]">or drag and drop</span>
                  </p>
                  <p className="text-[#636363] text-sm">
                    (Max. File size: 5 MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "adharDoc")}
                id="adharDocUpload"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          type="button"
          className="mt-[50px] bg-[#FE4101] text-white py-[16px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;
