import React, { createContext, useContext, useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "../utils/axiosInstance";

const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submit, setSubmit] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      city: "",
      address: "",
      noOfEmployees: "",
      cuisineType: "",
      profile: null,
      state: "",
      operatingHours: "",
      estimatedDeliveryTime: "",
      adharDoc: null,
      gstNo: "",
      panNo: "",
      accountHolderName: "",
      bankName: "",
      accountNo: "",
      accountType: "",
      gstDoc: null,
      upiId: "",
      IFSCCode: "",
      fssaiDoc: null,
      panDoc: null,
      menuDoc: null,
      letterOfUnderstanding: "",
      foodType: "",
    },
    onSubmit: async (values) => {
      try {
        // Create FormData object
        const formData = new FormData();

        // Append form values to FormData
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("address", values.address);
        formData.append("noOfEmployees", values.noOfEmployees);
        formData.append("cuisineType", values.cuisineType);
        formData.append("profile", "not available");
        formData.append("operatingHours", values.operatingHours);
        formData.append("estimatedDeliveryTime", values.estimatedDeliveryTime);

        // Append files to FormData
        if (values.adharDoc) formData.append("adharDoc", values.adharDoc);
        // if (values.gstDoc) formData.append("gstDoc", values.gstDoc);
        // if (values.fssaiDoc) formData.append("fssaiDoc", values.fssaiDoc);
        // if (values.panDoc) formData.append("panDoc", values.panDoc);
        // if (values.menuDoc) formData.append("menuDoc", values.menuDoc);

        // First API call
        await axiosInstance
          .post(`/restaurant/details`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("seller1", res);

            // Prepare the second FormData object for the second API call
            const bankGstFormData = new FormData();
            bankGstFormData.append("gstNo", values.gstNo);
            bankGstFormData.append("panNo", values.panNo);
            bankGstFormData.append(
              "accountHolderName",
              values.accountHolderName
            );
            bankGstFormData.append("bankName", values.bankName);
            bankGstFormData.append("accountNo", values.accountNo);
            bankGstFormData.append("accountType", values.accountType);

            // Ensure the gstDoc is a PDF file and set MIME type correctly
            if (values.gstDoc && values.gstDoc.type === "application/pdf") {
              bankGstFormData.append(
                "gstDoc",
                values.gstDoc,
                values.gstDoc.name
              );
            }

            // Append other files
            if (values.fssaiDoc && values.fssaiDoc.type === "application/pdf") {
              bankGstFormData.append(
                "fssaiDoc",
                values.fssaiDoc,
                values.gstDoc.name
              );
            }
            if (values.panDoc) bankGstFormData.append("panDoc", values.panDoc);
            if (values.menuDoc)
              bankGstFormData.append("menuDoc", values.menuDoc);

            bankGstFormData.append("upiId", values.upiId);
            bankGstFormData.append("IFSCCode", values.IFSCCode);
            bankGstFormData.append(
              "letterOfUnderstanding",
              values.letterOfUnderstanding
            );
            bankGstFormData.append("foodType", values.foodType);

            // Second API call
            axiosInstance
              .post("/restaurant/update-bank-gst", bankGstFormData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log("seller2", res);
                // setSubmit(true);
              })
              .catch((err) => {
                console.log(err);
                // setSubmit(false);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        setSubmit(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmit(false); 
      }
    },
  });

  return (
    <SellerContext.Provider
      value={{ formik, currentStep, nextStep, setCurrentStep, submit }}
    >
      {children}
    </SellerContext.Provider>
  );
};
