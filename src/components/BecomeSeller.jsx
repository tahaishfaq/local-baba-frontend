import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const BecomeSeller = ({ onNext }) => {
  const progress = 20;

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.dataTransfer.files[0]));
      event.dataTransfer.clearData();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-4 ">
      <div className=" p-8 max-w-4xl w-full">
        <h2 className="text-xl font-normal text-[#0D4041]">Step 1</h2>
        <h3 className="text-2xl font-semibold text-[#0D4041] mt-4 mb-8">
          Seller (Partner) Registration
        </h3>
        <ProgressBar />

        <h4 className="text-xl font-semibold text-[#434343] my-8">Basic Info</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Owner Full Name"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <input
            type="text"
            placeholder="Shop Name"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <input
            type="email"
            placeholder="Email Id"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <input
            type="text"
            placeholder="Mobile No."
              className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <input
            type="text"
            placeholder="Shop Mobile No."
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded focus:ring-0"
          />
          <select className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-0">
            <option className="text-black text-sm font-normal">
              Shop Timing
            </option>
            <option>9 AM - 6 PM</option>
            <option>10 AM - 7 PM</option>
            <option>11 AM - 8 PM</option>
          </select>
          <input
            type="text"
            placeholder="State"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded "
          />
          <input
            type="text"
            placeholder="City"
            className="p-3 border text-[#949494] text-sm font-normal border-gray-300 rounded "
          />
        </div>

        <h4 className="text-lg font-semibold text-[#434343] my-8">
          Aadhar & Pan Document
        </h4>

        <div
          className="border-dashed border-2 border-[#FE4101] rounded-lg p-6 mt-4 text-center w-full sm:w-1/2"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="mx-auto mb-4 max-h-40"
            />
          ) : (
            <div className="text-[#FE4101] text-2xl mb-2">
              <i className="fas fa-cloud-upload-alt"></i>
            </div>
          )}
          <p className="text-[#FE4101] font-semibold">
            {selectedImage
              ? "Image Uploaded"
              : "Click to Upload or Drag and Drop"}
          </p>
          <p className="text-gray-500 text-sm">(Max. File size: 5 MB)</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="cursor-pointer text-[#FE4101] underline"
          >
            {selectedImage ? "Change Image" : "Upload Image"}
          </label>
        </div>

        <button className="mt-12 w-2/5 bg-[#FE4101] text-white py-3 rounded-full hover:bg-[#FE4101] transition duration-300" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;
