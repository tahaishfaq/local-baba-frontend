import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiMail } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "sonner"; // Importing sonner
import axiosInstance from "../utils/axiosInstance";

export default function SellerLogin() {
  const { sellerLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        const result = await sellerLogin(values);
        if (result.success) {
          toast.success("Login successful!");
          setTimeout(() => {
            window.open("https://local-baba-restaurant.vercel.app/login", "_self")
          }, 1000);
        } else {
          setErrors({ general: result.message });
          toast.error(result.message);
        }
      } catch (err) {
        console.log(err);
        setErrors({
          general: "Please try again.",
        });
        toast.error("Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
          <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[30px]">
            <div className="flex flex-col items-start gap-y-3 lg:gap-y-6">
              <h2 className="lg:text-[36px] text-3xl font-bold text-[#0D4041] ">
                Seller Login
              </h2>
              <span className="text-[#949494] text-[14px] font-light">
                Please Log In To Your Account!
              </span>
            </div>

            {formik.errors.general && (
              <div className="text-red-500 text-sm mb-4">
                {formik.errors.general}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-[25px]">
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
                    className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
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
                    className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
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

              <div className="flex items-center justify-end">
                <div className="text-sm leading-6">
                  <Link
                    to="/forget-password"
                    className="font-light text-[#FE4101]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4 font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-y-[30px] pt-4">
              <div className="flex justify-center items-center">
                <button className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#F8F8F8] px-8 py-3 text-sm font-light text-[#434343] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
              <div>
                <p className="font-light text-center text-sm text-[#949494]">
                  New to Local Baba?{" "}
                  <Link
                    to="/seller-register"
                    className="leading-6 text-[#FE4101]"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
