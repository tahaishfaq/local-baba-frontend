import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const SellerStep2 = ({ onNext }) => {
  const [files, setFiles] = useState({
    gst: null,
    pan: null,
    fsai: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
    }
  };

  const removeFile = (type) => {
    setFiles((prevFiles) => ({ ...prevFiles, [type]: null }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <h2 className="text-xl font-normal text-[#0D4041] mb-4">Step 2</h2>
      <h3 className="text-2xl font-semibold text-[#0D4041] mb-8">Documentation</h3>

      <ProgressBar />

      <form className="space-y-4">
        <div>
          <label className="block text-[#434343] font-semibold text-xl my-8">
            Shop Category
          </label>
          <select className="w-full border rounded-lg p-2 mb-8">
            <option>Select Category</option>
          </select>
        </div>

        <div>
          <label className="block text-[#434343] font-semibold text-xl mb-6">
            GST Registration
          </label>
          <div className="flex space-x-4 mb-9">
            <button
              type="button"
              className="px-4 py-2 border w-full bg-[#fff5f2] border-[#FE4101] rounded-lg text-[#FE4101]"
            >
              Yes
            </button>
            <button
              type="button"
              className="px-4 py-2 border w-full bg-[#E6E6E6] border-gray-300 rounded-lg text-gray-500"
            >
              No
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <input
              type="text"
              placeholder="GST No."
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="PAN No."
              className="border p-2 rounded-lg w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#434343] font-semibold text-xl mb-2">
            Bank Details
          </label>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Bank Name"
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="A/C Type"
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="A/C No."
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="IFSC Code"
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="UPI Id"
              className="border p-2 rounded-lg w-full"
            />
          </div>
        </div>

        <div>
          <h4 className="text-[#434343] text-lg font-semibold mb-2">GST Document</h4>
          {files.gst ? (
            <div className="flex items-center justify-between border rounded-lg p-4">
              <p className="text-gray-700">{files.gst.name}</p>
              <button
                onClick={() => removeFile("gst")}
                className="text-[#FE4101]"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ) : (
            <div className="border-dashed border-2 border-[#CACACA] rounded-lg p-6 text-center">
              <div className="text-[#FE4101] text-2xl mb-2">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <p className="text-[#FE4101] font-semibold">
                Click to Upload or drag and drop
              </p>
              <p className="text-gray-500 text-sm">(Max. File size: 5 MB)</p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, "gst")}
                id="gstUpload"
              />
              <label
                htmlFor="gstUpload"
                className="cursor-pointer text-[#FE4101] underline"
              >
                Upload GST Document
              </label>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-[#434343] font-semibold text-lg mb-2">PAN Document</h4>
          {files.pan ? (
            <div className="flex items-center justify-between border rounded-lg p-4">
              <p className="text-gray-700">{files.pan.name}</p>
              <button
                onClick={() => removeFile("pan")}
                className="text-[#FE4101]"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ) : (
            <div className="border-dashed border-2 border-[#CACACA] rounded-lg p-6 text-center">
              <div className="text-[#FE4101] text-2xl mb-2">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <p className="text-[#FE4101] font-semibold">
                Click to Upload or drag and drop
              </p>
              <p className="text-gray-500 text-sm">(Max. File size: 5 MB)</p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, "pan")}
                id="panUpload"
              />
              <label
                htmlFor="panUpload"
                className="cursor-pointer text-[#FE4101] underline"
              >
                Upload PAN Document
              </label>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-[#434343] font-semibold text-lg mb-2">FSSAI Document</h4>
          {files.fsai ? (
            <div className="flex items-center justify-between border rounded-lg p-4">
              <p className="text-gray-700">{files.fsai.name}</p>
              <button
                onClick={() => removeFile("fsai")}
                className="text-[#FE4101]"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ) : (
            <div className="border-dashed border-2 border-[#CACACA] rounded-lg p-6 text-center">
              <div className="text-[#FE4101] text-2xl mb-2">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <p className="text-[#FE4101] font-semibold">
                Click to Upload or drag and drop
              </p>
              <p className="text-gray-500 text-sm">(Max. File size: 5 MB)</p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e, "fsai")}
                id="fsaiUpload"
              />
              <label
                htmlFor="fsaiUpload"
                className="cursor-pointer text-[#FE4101] underline"
              >
                Upload FSSAI Document
              </label>
            </div>
          )}
        </div>

        <div className="text-start mt-8">
          <button className="bg-[#FE4101] w-2/5 text-white px-6 py-3 rounded-full hover:bg-orange-600" onClick={onNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerStep2;
