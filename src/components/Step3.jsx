import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { CiFileOn } from "react-icons/ci";
import { useSeller } from "../context/SellerContext"; // Importing Formik context

const Step3 = ({ onNext }) => {
  const { formik } = useSeller(); // Use Formik context
  const progress = 60;
  const [selectedFile, setSelectedFile] = useState(null); // State for file preview

  const MAX_FILE_SIZE_MB = 5;

  // Handle file upload and preview
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Check if file size exceeds the maximum limit
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
        return;
      }

      // Set Formik field value
      formik.setFieldValue("menuDoc", file);
      setSelectedFile(file);
    }
  };

  // Handle drag and drop file upload
  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      // Check if file size exceeds the maximum limit
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
        return;
      }

      // Set Formik field value
      formik.setFieldValue("menuDoc", file);
      setSelectedFile(file);
      event.dataTransfer.clearData();
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    formik.setFieldValue("foodType", category); // Set Formik field value
  };

  const handleNextStep = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      foodType: true,
    });

    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      console.log("Errors:", errors); // Optional: Log the errors for debugging
    }
  };

  return (
    <div className="max-w-4xl mx-auto lg:py-[70px] py-[30px] lg:px-0 px-4">
      <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
        <div className="lg:space-y-[20px] space-y-[15px]">
          <h3 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
            Step 4
          </h3>
          <h2 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
            Food Category
          </h2>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <form className="space-y-[30px]">
        {/* Food Category Selection */}
        <div className="space-y-[20px]">
          <label className="block text-[#434343] font-medium text-[20px]">
            Food Category
          </label>
          <div className="grid grid-cols-1 gap-4">
            {["Veg", "Non-Veg", "Both"].map((category) => (
              <label
                key={category}
                className={`flex items-center space-x-3 border ${
                  formik.values.foodType === category
                    ? "border-[#FE4101]"
                    : "border-[#E6E6E6]"
                } p-4 rounded-lg cursor-pointer`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formik.values.foodType === category}
                  onChange={handleCategoryChange}
                  className="form-radio text-[#FE4101] focus:ring-[#FE4101]"
                />
                <span
                  className={`${
                    formik.values.foodType === category
                      ? "text-[#FE4101]"
                      : "text-[#949494]"
                  } font-normal text-sm capitalize`}
                >
                  {category}
                </span>
              </label>
            ))}
          </div>
          {formik.touched.foodType && formik.errors.foodType && (
            <div className="text-red-500 text-sm">
              {formik.errors.foodType}
            </div>
          )}
        </div>

        {/* Menu Document Upload */}
        <div className="space-y-[20px] pt-5">
          <h4 className="text-lg font-semibold text-[#434343]">Upload Menu</h4>
          <div
            className="border-dashed border-2 border-gray-300 rounded-[19px] px-8 py-6 text-center w-full sm:max-w-sm cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileUpload").click()}
          >
            {selectedFile ? (
              <div className="flex items-center justify-center flex-col">
                <CiFileOn className="text-[#FE4101] w-12 h-12 mb-4" />
                <p className="text-[#FE4101] font-normal text-lg">
                  {selectedFile.name}
                </p>
                <p className="text-[#636363] text-sm">
                  {Math.round(selectedFile.size / 1024)} KB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF1EB] mb-[15px]">
                  <CiFileOn className="text-[#FE4101] w-6 h-6" />
                </div>
                <p className="text-[#FE4101] font-normal text-lg ">
                  Click to Upload{" "}
                  <span className="text-[#636363]">or drag and drop</span>
                </p>
                <p className="text-[#636363] text-sm ">
                  (Max. File size: 5 MB)
                </p>
              </div>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
              id="fileUpload"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-[50px]">
          <button
            className="bg-[#FE4101] text-white py-[16px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] transition duration-300"
            onClick={handleNextStep}
            type="button"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
