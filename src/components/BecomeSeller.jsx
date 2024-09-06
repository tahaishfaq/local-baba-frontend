import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { CiFileOn } from "react-icons/ci";
import { useSeller } from "../context/SellerContext";
import axios from "axios";

const BecomeSeller = ({ onNext }) => {
  const { formik } = useSeller();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch states of India on component mount

  useEffect(() => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: "India",
      })
      .then((response) => {
        console.log("States",response.data.data);
        setStates(response.data.data.states);
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  useEffect(() => {
    if (formik.values.state) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: "India",
          state: formik.values.state,
        })
        .then((response) => {
          console.log("Cities",response.data.data);
          setCities(response.data.data);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [formik.values.state]);

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
              Step 2
            </h2>
            <h3 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
              Seller (Partner) Registration
            </h3>
          </div>
          <ProgressBar progress={30} />
        </div>

        <div className="space-y-[20px]">
          <h4 className="text-xl font-medium text-[#434343]">Basic Info</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="">
              <input
                type="text"
                name="name"
                placeholder="Owner Full Name"
                {...formik.getFieldProps("name")}
                className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <input
                type="tel"
                // pattern="\+91-[0-9]{5}-[0-9]{5}" indian patter
                name="phone"
                placeholder="Mobile No."
                {...formik.getFieldProps("phone")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              )}
            </div>
            <div>
              <select
                name="state"
                {...formik.getFieldProps("state")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  Select State
                </option>
                {states.map((state) => (
                  <option key={state.iso2} value={state.iso2}>
                    {state.name}
                  </option>
                ))}
              </select>
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-500 text-sm">
                  {formik.errors.state}
                </div>
              )}
            </div>
            <div>
              <select
                name="city"
                {...formik.getFieldProps("city")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities?.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-500 text-sm">{formik.errors.city}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                {...formik.getFieldProps("address")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              )}
            </div>
            <div>
              <input
                type="number"
                name="noOfEmployees"
                placeholder="No. of Employees"
                {...formik.getFieldProps("noOfEmployees")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              />
              {formik.touched.noOfEmployees && formik.errors.noOfEmployees && (
                <div className="text-red-500 text-sm">
                  {formik.errors.noOfEmployees}
                </div>
              )}
            </div>
            <div>
              <select
                name="cuisineType"
                {...formik.getFieldProps("cuisineType")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  Select Cuisine Type
                </option>
                <option>Italian</option>
                <option>Chinese</option>
                <option>Indian</option>
                {/* Add more options as needed */}
              </select>
              {formik.touched.cuisineType && formik.errors.cuisineType && (
                <div className="text-red-500 text-sm">
                  {formik.errors.cuisineType}
                </div>
              )}
            </div>
            <div>
              <select
                name="operatingHours"
                {...formik.getFieldProps("operatingHours")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  Select Operating Hours
                </option>
                <option value="6-10">6 AM - 10 PM</option>
                <option value="7-11">7 AM - 11 PM</option>
                <option value="8-12">8 AM - 12 AM</option>
                {/* Add more options as needed */}
              </select>
              {formik.touched.operatingHours &&
                formik.errors.operatingHours && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.operatingHours}
                  </div>
                )}
            </div>
            <div>
              <select
                name="estimatedDeliveryTime"
                {...formik.getFieldProps("estimatedDeliveryTime")}
                className="border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
              >
                <option value="" disabled>
                  Select Estimated Delivery Time
                </option>
                <option value="30">30 mins</option>
                <option value="45">45 mins</option>
                <option value="60">60 mins</option>
                {/* Add more options as needed */}
              </select>
              {formik.touched.estimatedDeliveryTime &&
                formik.errors.estimatedDeliveryTime && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.estimatedDeliveryTime}
                  </div>
                )}
            </div>
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
            {formik.touched.adharDoc && formik.errors.adharDoc && (
              <div className="text-red-500 text-sm">
                {formik.errors.adharDoc}
              </div>
            )}
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
