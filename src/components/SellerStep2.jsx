import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { FaCheckCircle } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useSeller } from "../context/SellerContext"; // Importing Formik context
import axiosInstance from "../utils/axiosInstance";

const SellerStep2 = ({ onNext }) => {
  const { formik } = useSeller(); // Use the Formik context
  const progress = 40;
  const [isGSTRegistered, setIsGSTRegistered] = useState(true);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("global/all-categories");
        console.log("Categories", response.data.categories);
        setFoodCategories(response?.data?.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleGSTSelection = (isRegistered) => {
    setIsGSTRegistered(isRegistered);
    if (isRegistered) {
      // Reset GST-related fields in Formik when GST is registered
      formik.setFieldValue("gstDoc", null);
    }
  };

  // Initialize files state for upload status management
  const [files, setFiles] = useState({
    gstDoc: { file: null, status: "idle", progress: 0, url: null },
    panDoc: { file: null, status: "idle", progress: 0, url: null },
    fssaiDoc: { file: null, status: "idle", progress: 0, url: null },
  });

  const MAX_FILE_SIZE_MB = 3;

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size exceeds the 3MB limit
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert("File size exceeds 3MB. Please upload a smaller file.");
        return;
      }

      const fileURL = URL.createObjectURL(file); // Generate a URL for the file

      setFiles((prevFiles) => ({
        ...prevFiles,
        [type]: { file, status: "uploading", progress: 0, url: fileURL },
      }));
      formik.setFieldValue(type, file); // Update Formik field with the file
      simulateUpload(type);
    }
  };

  const simulateUpload = (type) => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prevFiles) => ({
          ...prevFiles,
          [type]: { ...prevFiles[type], status: "uploaded", progress: 100 },
        }));

        // Transition to 'completed' status after 5 seconds
        setTimeout(() => {
          setFiles((prevFiles) => ({
            ...prevFiles,
            [type]: { ...prevFiles[type], status: "completed" },
          }));
        }, 700);
      } else {
        progress += 20;
        setFiles((prevFiles) => ({
          ...prevFiles,
          [type]: { ...prevFiles[type], progress },
        }));
      }
    }, 500);
  };

  const removeFile = (type) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: { file: null, status: "idle", progress: 0, url: null },
    }));
    formik.setFieldValue(type, null); // Reset the Formik field when file is removed
  };

  const handleNextStep = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      // shopCategory: true,
      accountHolderName: true,
      bankName: true,
      accountNo: true,
      accountType: true,
      upiId: true,
      IFSCCode: true,
    });

    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      console.log("Errors:", errors); // Optional: Log the errors for debugging
    }
  };

  return (
    <div className="mx-auto max-w-4xl lg:py-[70px] py-[30px] lg:px-0 px-4">
      <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
        <div className="lg:space-y-[20px] space-y-[15px]">
          <h2 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
            Step 3
          </h2>
          <h3 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
            Documentation
          </h3>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-[30px]">
        <div className="space-y-[20px] w-full">
          <label className="block text-[#434343] font-medium text-[20px]">
            Shop Category <span className="italic text-gray-400 text-base ml-2">Optional</span>
          </label>
          <select
            name="shopCategory"
            {...formik.getFieldProps("shopCategory")}
            className="border text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
          >
            <option value="">Select Category</option>
            {foodCategories?.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* {formik.touched.shopCategory && formik.errors.shopCategory && (
            <div className="text-red-500 text-sm">
              {formik.errors.shopCategory}
            </div>
          )} */}
        </div>

        <div className="space-y-[20px]">
          <label className="block text-[#434343] font-medium text-xl mb-6">
            GST Registration
          </label>
          <div className="flex space-x-4 mb-9">
            <button
              type="button"
              className={`border text-sm font-normal w-full rounded-[12px] p-[15px] bg-[#F8F8F8] border-[#949494] text-[#949494] ${
                isGSTRegistered &&
                "bg-[#fff5f2] border-[#FE4101] text-[#FE4101]"
              }`}
              onClick={() => handleGSTSelection(true)}
              aria-label="Register GST"
            >
              Yes
            </button>
            <button
              type="button"
              className={`border text-sm font-normal w-full rounded-[12px] p-[15px] bg-[#F8F8F8] border-[#949494] text-[#949494] ${
                !isGSTRegistered &&
                "bg-[#fff5f2] border-[#FE4101] text-[#FE4101]"
              }`}
              onClick={() => handleGSTSelection(false)}
              aria-label="Do not register GST"
            >
              No
            </button>
          </div>

          {isGSTRegistered && (
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-8">
              <div>
                <input
                  type="text"
                  name="gstNo"
                  placeholder="GST No."
                  {...formik.getFieldProps("gstNo")}
                  className="border text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
                />
                {formik.touched.gstNo && formik.errors.gstNo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.gstNo}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="panNo"
                  placeholder="PAN No."
                  {...formik.getFieldProps("panNo")}
                  className="border text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
                />
                {formik.touched.panNo && formik.errors.panNo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.panNo}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bank Details */}
        <div className="space-y-[20px]">
          <label className="block text-[#434343] font-medium text-xl">
            Bank Details
          </label>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                {...formik.getFieldProps("accountHolderName")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              />
              {formik.touched.accountHolderName &&
                formik.errors.accountHolderName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.accountHolderName}
                  </div>
                )}
            </div>
            <div>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                {...formik.getFieldProps("bankName")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              />
              {formik.touched.bankName && formik.errors.bankName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.bankName}
                </div>
              )}
            </div>
            <div>
              <select
                name="accountType"
                {...formik.getFieldProps("accountType")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  A/C Type
                </option>
                <option value="Current">Current</option>
                <option value="Saving">Saving</option>
              </select>
              {formik.touched.accountType && formik.errors.accountType && (
                <div className="text-red-500 text-sm">
                  {formik.errors.accountType}
                </div>
              )}
            </div>

            <div>
              <input
                type="number"
                name="accountNo"
                placeholder="A/C No."
                {...formik.getFieldProps("accountNo")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              />
              {formik.touched.accountNo && formik.errors.accountNo && (
                <div className="text-red-500 text-sm">
                  {formik.errors.accountNo}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="IFSCCode"
                placeholder="IFSC Code"
                {...formik.getFieldProps("IFSCCode")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              />
              {formik.touched.IFSCCode && formik.errors.IFSCCode && (
                <div className="text-red-500 text-sm">
                  {formik.errors.IFSCCode}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="upiId"
                placeholder="UPI Id"
                {...formik.getFieldProps("upiId")}
                className="order text-[#949494] text-sm font-normal w-full border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:border-[#0D4041]"
              />
              {formik.touched.upiId && formik.errors.upiId && (
                <div className="text-red-500 text-sm">
                  {formik.errors.upiId}
                </div>
              )}
            </div>
          </div>
        </div>

        {isGSTRegistered && (
          <div>
            {["gstDoc"].map((docType) => (
              <div key={docType} className="space-y-[20px]">
                <h4 className="text-[#434343] font-medium text-lg">
                  {docType?.split("Doc")[0]?.toUpperCase()} Document
                </h4>
                {files[docType].status === "idle" ? (
                  <div className="border-dashed border-2 border-[#CACACA] rounded-[6px] p-6 text-center">
                    <label
                      htmlFor={`${docType}Upload`}
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF1EB] mb-[15px]">
                        <CiFileOn className="text-[#FE4101] w-6 h-6" />
                      </div>
                      <p className="text-[#FE4101] font-normal text-lg">
                        Click to Upload{" "}
                        <span className="text-[#636363]">or drag and drop</span>
                      </p>
                      <p className="text-[#636363] text-sm">
                        (Max. File size: 3 MB)
                      </p>

                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, docType)}
                        id={`${docType}Upload`}
                      />
                    </label>
                  </div>
                ) : files[docType].status === "uploading" ? (
                  <div className="border border-[#CACACA] rounded-[6px] p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start gap-x-2">
                        <p className="text-[#0D4041] flex items-center gap-x-2">
                          <CiFileOn className="w-5 h-5" />{" "}
                          {files[docType].file.name}
                        </p>
                        <div className="pl-7">
                          <p className="text-[#949494]">200kb</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(docType)}
                        className="text-[#0D4041]"
                        aria-label={`Remove ${docType.toUpperCase()} document`}
                      >
                        <GoTrash className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-x-2 pt-4">
                      <div className="w-full bg-[#F5F5F5] rounded-full ">
                        <div
                          className="bg-[#FE4101] h-[7px] rounded-full"
                          style={{ width: `${files[docType].progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#949494]">
                        {files[docType].progress}%
                      </span>
                    </div>
                  </div>
                ) : files[docType].status === "uploaded" ? (
                  <div className="border border-[#CACACA] rounded-[6px] p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start gap-x-2">
                        <p className="text-[#0D4041] flex items-center gap-x-2">
                          <CiFileOn className="w-5 h-5" />{" "}
                          {files[docType].file.name}
                        </p>
                        <div className="pl-7">
                          <p className="text-[#949494]">200kb</p>
                        </div>
                      </div>
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div className="flex items-center gap-x-2 pt-4">
                      <div className="w-full bg-[#F5F5F5] rounded-full ">
                        <div
                          className="bg-green-500 h-[7px] rounded-full"
                          style={{ width: `100%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : files[docType].status === "completed" ? (
                  <div className="border border-[#CACACA] rounded-[6px] p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col items-start gap-x-2">
                        <p className="text-[#0D4041] flex items-center gap-x-2">
                          <CiFileOn className="w-5 h-5" />{" "}
                          {files[docType].file.name}
                        </p>
                        <div className="pl-7">
                          <p className="text-[#949494]">200kb</p>
                          <p className="text-green-500 text-base">
                            <span
                              className="text-[#FE4101] font-semibold cursor-pointer"
                              onClick={() =>
                                window.open(files[docType].url, "_blank")
                              }
                            >
                              Click to view
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(docType)}
                        className="text-[#0D4041]"
                        aria-label={`Remove ${docType.toUpperCase()} document`}
                      >
                        <GoTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
        <div>
          {["panDoc", "fssaiDoc"].map((docType) => (
            <div key={docType} className="space-y-[20px]">
              <h4 className="text-[#434343] font-medium text-lg">
                {docType?.split("Doc")[0]?.toUpperCase()} Document
              </h4>
              {files[docType].status === "idle" ? (
                <div className="border-dashed border-2 border-[#CACACA] rounded-[6px] p-6 text-center">
                  <label
                    htmlFor={`${docType}Upload`}
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF1EB] mb-[15px]">
                      <CiFileOn className="text-[#FE4101] w-6 h-6" />
                    </div>
                    <p className="text-[#FE4101] font-normal text-lg">
                      Click to Upload{" "}
                      <span className="text-[#636363]">or drag and drop</span>
                    </p>
                    <p className="text-[#636363] text-sm">
                      (Max. File size: 3 MB)
                    </p>

                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, docType)}
                      id={`${docType}Upload`}
                    />
                  </label>
                </div>
              ) : files[docType].status === "uploading" ? (
                <div className="border border-[#CACACA] rounded-[6px] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-x-2">
                      <p className="text-[#0D4041] flex items-center gap-x-2">
                        <CiFileOn className="w-5 h-5" />{" "}
                        {files[docType].file.name}
                      </p>
                      <div className="pl-7">
                        <p className="text-[#949494]">200kb</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(docType)}
                      className="text-[#0D4041]"
                      aria-label={`Remove ${docType.toUpperCase()} document`}
                    >
                      <GoTrash className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-x-2 pt-4">
                    <div className="w-full bg-[#F5F5F5] rounded-full ">
                      <div
                        className="bg-[#FE4101] h-[7px] rounded-full"
                        style={{ width: `${files[docType].progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#949494]">
                      {files[docType].progress}%
                    </span>
                  </div>
                </div>
              ) : files[docType].status === "uploaded" ? (
                <div className="border border-[#CACACA] rounded-[6px] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-x-2">
                      <p className="text-[#0D4041] flex items-center gap-x-2">
                        <CiFileOn className="w-5 h-5" />{" "}
                        {files[docType].file.name}
                      </p>
                      <div className="pl-7">
                        <p className="text-[#949494]">200kb</p>
                      </div>
                    </div>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                  <div className="flex items-center gap-x-2 pt-4">
                    <div className="w-full bg-[#F5F5F5] rounded-full ">
                      <div
                        className="bg-green-500 h-[7px] rounded-full"
                        style={{ width: `100%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : files[docType].status === "completed" ? (
                <div className="border border-[#CACACA] rounded-[6px] p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col items-start gap-x-2">
                      <p className="text-[#0D4041] flex items-center gap-x-2">
                        <CiFileOn className="w-5 h-5" />{" "}
                        {files[docType].file.name}
                      </p>
                      <div className="pl-7">
                        <p className="text-[#949494]">200kb</p>
                        <p className="text-green-500 text-base">
                          <span
                            className="text-[#FE4101] font-semibold cursor-pointer"
                            onClick={() =>
                              window.open(files[docType].url, "_blank")
                            }
                          >
                            Click to view
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(docType)}
                      className="text-[#0D4041]"
                      aria-label={`Remove ${docType.toUpperCase()} document`}
                    >
                      <GoTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

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

export default SellerStep2;
