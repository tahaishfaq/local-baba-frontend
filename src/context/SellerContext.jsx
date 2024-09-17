import React, { createContext, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";

const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (localStorage?.sellerToken) {
      setCurrentStep(2);
    }
  }, [localStorage?.sellerToken]);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

 const stepValidationSchemas = [
    Yup.object({}),

    Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      phone: Yup.string().required("Phone number is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      noOfEmployees: Yup.number()
        .required("Number of employees is required")
        .positive("Must be a positive number"),
      cuisineType: Yup.array()
        .of(Yup.string().required("Cuisine type is required"))
        .min(1, "At least one cuisine type is required"),
      state: Yup.string().required("State is required"),
      operatingHours: Yup.string().required("Operating hours are required"),
      estimatedDeliveryTime: Yup.string().required(
        "Estimated delivery time is required"
      ),
    }),

    Yup.object({
      shopCategory: Yup.string().required(
        "Shop Category is required"
      ),
      accountHolderName: Yup.string().required(
        "Account holder name is required"
      ),
      bankName: Yup.string().required("Bank name is required"),
      accountNo: Yup.number()
        .typeError("Account number must be a number")
        .required("Account number is required"),
      accountType: Yup.string().required("Account type is required"),
      upiId: Yup.string().required("UPI ID is required"),
      IFSCCode: Yup.string().required("IFSC code is required"),
    }),

    Yup.object({
      foodType: Yup.string().required("Food type is required"),
    }),

    Yup.object({
      letterOfUnderstanding: Yup.string().required(
        "Letter of understanding is required"
      ),
      agreement: Yup.boolean().oneOf([true], "You must agree to the terms and conditions")
    }),
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      phone: "",
      city: "",
      address: "",
      noOfEmployees: "",
      cuisineType: [],
      profile: null,
      state: "",
      operatingHours: "",
      estimatedDeliveryTime: "",
      adharDoc: null,
      gstNo: "",
      panNo: "",
      shopCategory: "",
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
      agreement: false,
    },
    validationSchema: stepValidationSchemas[currentStep - 1], 
    onSubmit: async (values) => {
      try {

        console.log(values.cuisineType);
        
        const sellerToken = localStorage.getItem("sellerToken");

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("phone", values.phone);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("address", values.address);
        formData.append("noOfEmployees", values.noOfEmployees);
        formData.append("cuisineType", values.cuisineType);
        formData.append("profile", "not available");
        formData.append("operatingHours", values.operatingHours);
        formData.append("estimatedDeliveryTime", values.estimatedDeliveryTime);
        if (values.adharDoc) formData.append("adharDoc", values.adharDoc);

        const bankGstFormData = new FormData();
        bankGstFormData.append("gstNo", values.gstNo);
        bankGstFormData.append("panNo", values.panNo);
        bankGstFormData.append("categoryId", values.shopCategory);
        bankGstFormData.append("accountHolderName", values.accountHolderName);
        bankGstFormData.append("bankName", values.bankName);
        bankGstFormData.append("accountNo", values.accountNo);
        bankGstFormData.append("accountType", values.accountType);
        if (values.gstDoc && values.gstDoc.type === "application/pdf") {
          bankGstFormData.append("gstDoc", values.gstDoc, values.gstDoc.name);
        } else {
          bankGstFormData.append("gstDoc", "");
        }
        if (values.fssaiDoc && values.fssaiDoc.type === "application/pdf") {
          bankGstFormData.append(
            "fssaiDoc",
            values.fssaiDoc,
            values.fssaiDoc.name
          );
        }
        if (values.panDoc) bankGstFormData.append("panDoc", values.panDoc);
        if (values.menuDoc) bankGstFormData.append("menuDoc", values.menuDoc);
        bankGstFormData.append("upiId", values.upiId);
        bankGstFormData.append("IFSCCode", values.IFSCCode);
        bankGstFormData.append(
          "letterOfUnderstanding",
          values.letterOfUnderstanding
        );
        bankGstFormData.append("foodType", values.foodType);

        await Promise.all([
          axiosInstance.post(`/restaurant/details`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sellerToken}`,
            },
          }),
          axiosInstance.post("/restaurant/update-bank-gst", bankGstFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${sellerToken}`,
            },
          }),
        ])
          .then((res) => {
            console.log("Both requests succeeded:", res);
            setSubmit(true);
          })
          .catch((err) => {
            console.error("Error in one or both requests:", err);
            setSubmit(false);
          });
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmit(false);
      }finally{
        formik.resetForm()
      }
    },
    enableReinitialize: true,
  },
);

  return (
    <SellerContext.Provider
      value={{ formik, currentStep, nextStep, setCurrentStep, submit }}
    >
      {children}
    </SellerContext.Provider>
  );
};
