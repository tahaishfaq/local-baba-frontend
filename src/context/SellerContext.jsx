import React, { createContext, useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

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
    },
    onSubmit: async (values) => {
      try {
        // First API call
        await axiosInstance
          .post(`/restaurant/details`, {
            name: values.name,
            phone: values.phone,
            city: values.city,
            address: values.address,
            noOfEmployees: values.noOfEmployees,
            cuisineType: values.cuisineType,
            profile: values.profile,
            operatingHours: values.operatingHours,
            estimatedDeliveryTime: values.estimatedDeliveryTime,
            adharDoc: values.adharDoc,
          })
          .then((res) => {
            console.log("seller1", res);
            axiosInstance
              .post("/restaurant/update-bank-gst", {
                gstNo: values.gstNo,
                panNo: values.panNo,
                accountHolderName: values.accountHolderName,
                bankName: values.bankName,
                accountNo: values.accountNo,
                accountType: values.accountType,
                gstDoc: values.gstDoc,
                upiId: values.upiId,
                IFSCCode: values.IFSCCode,
                fssaiDoc: values.fssaiDoc,
                panDoc: values.panDoc,
                menuDoc: values.menuDoc,
                letterOfUnderstanding: values.letterOfUnderstanding,
              })
              .then((res) => {
                console.log("seller2", res);
              })
              .catch((err) => {
                console.log(err);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <SellerContext.Provider value={{ formik, currentStep, nextStep }}>
      {children}
    </SellerContext.Provider>
  );
};
