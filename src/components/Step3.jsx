import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

const Step3 = ({ onNext }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Step Indicator */}
      <h3 className="text-xl font-normal text-[#0D4041] mb-4">Step 3</h3>
      <h2 className="text-2xl font-semibold text-[#0D4041] mb-8">Food Category</h2>
      <div className="mb-10">
        <ProgressBar/>
      </div>

      {/* Radio Buttons */}
      <div className="space-y-4 mb-6">
        <label className="flex items-center space-x-3 border-2 border-[#E6E6E6] p-4 rounded-lg">
          <input
            type="radio"
            name="category"
            value="veg"
            checked={selectedCategory === "veg"}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-radio text-[#FE4101]  "
          />
          <span className="text-[#949494] font-normal text-sm">Veg</span>
        </label>
        <label className="flex items-center space-x-3 border-2 border-[#E6E6E6] p-4 rounded-lg">
          <input
            type="radio"
            name="category"
            value="non-veg"
            checked={selectedCategory === "non-veg"}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-radio text-[#FE4101] focus:ring-[#FE4101]"
          />
          <span className="text-gray-700">Non Veg</span>
        </label>
        <label className="flex items-center space-x-3 border-2 border-[#E6E6E6] p-4 rounded-lg">
          <input
            type="radio"
            name="category"
            value="both"
            checked={selectedCategory === "both"}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-radio text-[#FE4101] focus:ring-[#FE4101]"
          />
          <span className="text-gray-700">Both</span>
        </label>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <FaCloudUploadAlt className="mx-auto text-[#FE4101] text-4xl mb-4" />
        <p className="text-[#FE4101] mb-2 font-semibold">Click to Upload</p>
        <p className="text-gray-500">or drag and drop</p>
        <p className="text-gray-400 text-sm">Max. File size: 5 MB</p>
      </div>

      {/* Next Button */}
      <div className="mt-6">
        <button className="w-2/5 bg-[#FE4101] text-white py-2 rounded-full transition-colors" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
