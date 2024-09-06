import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiMail } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "sonner"; // Importing sonner
import axiosInstance from "../utils/axiosInstance";
import ProgressBar from "./ProgressBar";

export default function SellerRegister({onNext}) {
  const { sellerRegister } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const progress = 10;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const json = {
          email: values.email,
          password: values.password,
        };
        const result = await sellerRegister(json);
        if (result.success) {
          toast.success(
            "Registration successful! Please check your email for OTP."
          );
          setTimeout(() => {
            navigate("/seller-otp");
          }, 500);
        } else {
          setErrors({ general: result.message });
          toast.error(result.message);
        }

       
      } catch (err) {
        setErrors({ general: "Please try again." });
        toast.error("Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex justify-center items-center lg:py-[70px] py-[10px]">
      <div className="lg:p-8 p-4 max-w-4xl w-full">
        <div className="lg:space-y-[30px] space-y-[20px] lg:pb-5 pb-4">
          <div className="lg:space-y-[20px] space-y-[15px]">
            <h2 className="lg:text-[20px] text-[16px] font-normal text-[#0D4041]">
              Step 1
            </h2>
            <h3 className="lg:text-2xl text-[18px] font-semibold text-[#0D4041]">
              Seller (Partner) Registration
            </h3>
          </div>
          <ProgressBar progress={progress} />
        </div>

        <div className="lg:py-10 py-6">

        {formik.errors.general && (
              <div className="text-red-500 text-sm mb-4">
                {formik.errors.general}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-[25px] max-w-md mx-auto">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter Email"
                    {...formik.getFieldProps("email")}
                    className="block w-full rounded-[12px] border-0 py-[14px] px-[16px]  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center">
                    <CiMail className="w-5 h-5 text-[#434343]" />
                  </span>
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter Password"
                    {...formik.getFieldProps("password")}
                    className="block w-full rounded-[12px] border-0 py-[14px] px-[16px]  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                  />
                  <span
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5 text-[#434343]" />
                    ) : (
                      <FiEye className="w-5 h-5 text-[#434343]" />
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4  font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {formik.isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-y-[30px] pt-4">
              {/* <div className="flex justify-center items-center">
                <button className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#F8F8F8] px-8 py-3 text-sm font-light text-[#434343] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M23.494 12.276c0-.859-.078-1.683-.195-2.48H12v4.695h6.446c-.28 1.42-1.088 2.563-2.286 3.356v2.79h3.68c2.157-1.982 3.388-4.906 3.388-8.36z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 24c3.15 0 5.788-1.048 7.717-2.829l-3.68-2.79c-1.02.684-2.32 1.096-4.037 1.096-3.107 0-5.736-2.101-6.676-4.935H1.517v3.037C3.437 21.537 7.355 24 12 24z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.324 14.542A7.726 7.726 0 0 1 4.818 12c0-.886.157-1.744.506-2.542V6.421H1.517A12.025 12.025 0 0 0 0 12c0 1.905.455 3.703 1.517 5.579l3.807-3.037z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 4.779c1.73 0 3.063.694 4.037 1.276l3.015-3.015C17.788 1.22 15.15 0 12 0 7.355 0 3.437 2.463 1.517 6.421l3.807 3.037c.94-2.834 3.57-4.68 6.676-4.68z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div> */}

              <div className="text-[#949494] flex flex-wrap justify-center gap-x-[5px] text-[14px]">
                Already have an account?
                <Link to="/seller-login" className="text-[#FE4101] font-normal">
                  Login
                </Link>
              </div>
            </div>
            </div>
        <button
          onClick={onNext}
          disabled={formik.isSubmitting}
          type="button"
          className="mt-[50px] bg-[#FE4101] text-white py-[16px] lg:w-2/5 w-full rounded-full hover:bg-[#FE4101] transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}
