import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { CiFileOn } from "react-icons/ci";
import { useSeller } from "../context/SellerContext";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Select from "react-select";
import { FiMapPin } from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";

const BecomeSeller = ({ onNext }) => {
  const { formik } = useSeller();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState("");

  // Fetch states of India on component mount
  useEffect(() => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: "India",
      })
      .then((response) => {
        console.log("States", response.data.data);
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
          console.log("Cities", response.data.data);
          setCities(response.data.data);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [formik.values.state]);

  // Handle address selection from Google Places Autocomplete
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    formik.setFieldValue("address", value);
  };

  // Function to get the user's current location
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding to convert latitude/longitude to address
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBU-Yqb6m34Z6ZWGo7ueFrm6OYmP-Ma2hU`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const currentAddress = data.results[0].formatted_address;
          setAddress(currentAddress);
          formik.setFieldValue("address", currentAddress);
        } else {
          console.error("No address found for this location");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

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

  // Options for cuisine type
  const [cuisineOptions, setCuisineOptions] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/global/cuisines")
      .then((res) => {
        const transformedCuisines = res.data.cuisines.map((cuisine) => ({
          value:
            cuisine.name?.charAt(0)?.toUpperCase() + cuisine.name?.slice(1),
          label:
            cuisine.name?.charAt(0)?.toUpperCase() + cuisine.name?.slice(1), // Capitalize first letter for the label
        }));
        setCuisineOptions(transformedCuisines); // Update state with transformed options
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });
  }, []);

  // Check if required fields are filled before moving to the next step
  const handleNextStep = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      name: true,
      description: true,
      phone: true,
      state: true,
      city: true,
      address: true,
      noOfEmployees: true,
      cuisineType: true,
      operatingHours: true,
      estimatedDeliveryTime: true,
      // Add any other fields that are required for the current step
    });

    if (Object.keys(errors).length === 0) {
      onNext();
    } else {
      console.log("Errors:", errors); // Optional: Log the errors for debugging
    }
  };

  const handleProfileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      ownerDetails.setFieldValue("profile", event.target.files[0]);
    }
  };

  const ownerDetails = useFormik({
    initialValues: {
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      gender: "",
      DOB: "",
      nationality: "",
      profile: null,
    },
    validationSchema: Yup.object().shape({
      ownerName: Yup.string().required("Owner Name is required"),
      ownerEmail: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      ownerPhone: Yup.string().required("Phone number is required"),
      gender: Yup.string().required("Gender is required"),
      DOB: Yup.string().required("Date of Birth is required"),
      nationality: Yup.string().required("Nationality is required"),
      profile: Yup.mixed().required("Profile image is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.ownerName);
      formData.append("email", values.ownerEmail);
      formData.append("phone", values.ownerPhone);
      formData.append("gender", values.gender);
      formData.append("DOB", values.DOB);
      formData.append("nationality", values.nationality);
      formData.append("profile", values.profile);

      // Retrieve the sellerToken from localStorage
      const sellerToken = localStorage.getItem("sellerToken");

      try {
        const response = await axiosInstance.post(
          `/restaurant/owner-details`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sellerToken}`, // Include the token in the Authorization header
            },
          }
        );
        console.log("Owner details submitted:", response.data);
        handleNextStep();
      } catch (error) {
        console.error("Error submitting owner details:", error);
      }
    },
  });

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

        <form onSubmit={ownerDetails.handleSubmit}>
          <div className="space-y-[20px]">
            <h4 className="text-xl font-medium text-[#434343]">
              Owner Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  {...ownerDetails.getFieldProps("ownerName")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {ownerDetails.touched.ownerName &&
                  ownerDetails.errors.ownerName && (
                    <div className="text-red-500 text-sm">
                      {ownerDetails.errors.ownerName}
                    </div>
                  )}
              </div>
              <div>
                <input
                  type="email"
                  name="ownerEmail"
                  placeholder="Owner Email"
                  {...ownerDetails.getFieldProps("ownerEmail")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {ownerDetails.touched.ownerEmail &&
                  ownerDetails.errors.ownerEmail && (
                    <div className="text-red-500 text-sm">
                      {ownerDetails.errors.ownerEmail}
                    </div>
                  )}
              </div>
              <div>
                <input
                  type="tel"
                  name="ownerPhone"
                  placeholder="Owner Phone"
                  {...ownerDetails.getFieldProps("ownerPhone")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {ownerDetails.touched.ownerPhone &&
                  ownerDetails.errors.ownerPhone && (
                    <div className="text-red-500 text-sm">
                      {ownerDetails.errors.ownerPhone}
                    </div>
                  )}
              </div>
              <div>
                <select
                  name="gender"
                  {...ownerDetails.getFieldProps("gender")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                >
                  <option value="" label="Select gender" />
                  <option value="Male" label="Male" />
                  <option value="Female" label="Female" />
                </select>
                {ownerDetails.touched.gender && ownerDetails.errors.gender && (
                  <div className="text-red-500 text-sm">
                    {ownerDetails.errors.gender}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="date"
                  name="DOB"
                  {...ownerDetails.getFieldProps("DOB")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {ownerDetails.touched.DOB && ownerDetails.errors.DOB && (
                  <div className="text-red-500 text-sm">
                    {ownerDetails.errors.DOB}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  {...ownerDetails.getFieldProps("nationality")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {ownerDetails.touched.nationality &&
                  ownerDetails.errors.nationality && (
                    <div className="text-red-500 text-sm">
                      {ownerDetails.errors.nationality}
                    </div>
                  )}
              </div>
              <div className="flex flex-col items-start gap-y-4 mt-2">
                <h4 className="text-lg font-semibold text-[#434343]">
                  Profile Picture
                </h4>

                <label
                  htmlFor="profileUpload"
                  className="border-dashed border-2 border-gray-300 rounded-[19px] px-8 py-6 text-center w-full sm:max-w-sm cursor-pointer"
                >
                  {ownerDetails.values.profile ? (
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={URL.createObjectURL(ownerDetails.values.profile)}
                        alt="Uploaded"
                        className="w-20 mb-2 h-20 rounded-full object-cover object-center"
                      />
                      <p className="text-[#FE4101] font-normal text-lg">
                        Click to Update{" "}
                        <span className="text-[#636363]">or drag and drop</span>
                      </p>
                      <p className="text-[#636363] text-sm">
                        (Max. File size: 5 MB)
                      </p>
                    </div>
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
                    onChange={handleProfileChange}
                    id="profileUpload"
                  />
                </label>
                {ownerDetails.touched.profile &&
                  ownerDetails.errors.profile && (
                    <div className="text-red-500 text-sm">
                      {ownerDetails.errors.profile}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="space-y-[20px] mt-10">
            <h4 className="text-xl font-medium text-[#434343]">Basic Info</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Resturant Name"
                  {...formik.getFieldProps("name")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="tel"
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
                  <div className="text-red-500 text-sm">
                    {formik.errors.city}
                  </div>
                )}
              </div>
              <div className="col-span-2">
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                  searchOptions={{
                    componentRestrictions: { country: "in" }, // Restrict to India
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div className="w-full relative">
                      <input
                        {...getInputProps({
                          placeholder: "Search by Location",
                          className:
                            "border text-[#949494] text-sm w-full font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]",
                        })}
                      />
                      <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
                        
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? "cursor-pointer bg-[#FE4101] text-white px-4 py-2"
                            : "cursor-pointer bg-white text-black px-4 py-2";
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                              })}
                              key={index}
                            >
                              <div className="flex items-center">
                                <FiMapPin className="mr-2" />
                                {suggestion.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute z-10 top-[20%] right-2">
                          <button
                            type="button"
                            onClick={handleUseCurrentLocation}
                            className="w-full px-3 py-2 bg-[#FE4101] text-white text-xs font-medium rounded-full"
                          >
                            Current Location
                          </button>
                        </div>
                    </div>
                  )}
                </PlacesAutocomplete>
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
                {formik.touched.noOfEmployees &&
                  formik.errors.noOfEmployees && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.noOfEmployees}
                    </div>
                  )}
              </div>
              <div>
                <Select
                  isMulti
                  name="cuisineType"
                  options={cuisineOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={cuisineOptions.filter((option) =>
                    formik.values.cuisineType.includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    formik.setFieldValue(
                      "cuisineType",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                />
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
                  <option value="11-10">11 AM - 10 PM</option>
                  <option value="8-12">8 AM - 12 PM</option>
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
                  <option value="15-30 mins">15-30 mins</option>
                  <option value="20-35 mins">20-35 mins</option>
                  <option value="30-45 mins">30-45 mins</option>
                  <option value="40-55 mins">40-55 mins</option>
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
              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  {...formik.getFieldProps("description")}
                  className="border text-[#949494] w-full text-sm font-normal border-[#E6E6E6] rounded-[12px] p-[15px] focus:ring-0 focus:outline-none focus:border-[#0D4041]"
                  rows="4" // You can adjust the number of rows as needed
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <h4 className="text-lg font-semibold text-[#434343]">
                Aadhar & Pan Document
              </h4>

              <div
                className="border-dashed border-2 border-gray-300 rounded-[19px] px-8 py-6 text-center w-full sm:max-w-sm cursor-pointer"
                onDrop={(e) => handleDrop(e, "adharDoc")}
                onDragOver={(e) => e.preventDefault()}
                onClick={() =>
                  document.getElementById("adharDocUpload").click()
                }
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

          <div className="col-span-2">
            <button
              type="submit"
              className="mt-[50px] bg-[#FE4101] text-white py-[16px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
