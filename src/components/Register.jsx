import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiMail } from "react-icons/ci";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "sonner"; // Importing sonner

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const json = {
          name: values.name,
          phone: "12345678",
          email: values.email,
          password: values.password,
        };
        const result = await register(json);
        if (result.success) {
          toast.success(
            "Registration successful! Please check your email for OTP."
          );
          setTimeout(() => {
            navigate("/otp");
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
    <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
        <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[30px]">
          <div className="flex flex-col items-start gap-y-6">
            <h2 className="text-[36px] font-bold text-[#0D4041] ">
              Buyer Register
            </h2>
            <span className="text-[#949494] text-[14px] font-light">
              Create your account!
            </span>
          </div>

          {formik.errors.general && (
            <div className="text-red-500 text-sm mb-4">
              {formik.errors.general}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-[25px]">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="mt-2 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter Name"
                  {...formik.getFieldProps("name")}
                  className="block w-full rounded-[12px] border-0 py-[14px] px-[16px]  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                />
                <span className="absolute inset-y-0 right-4 flex items-center">
                  <CiMail className="w-5 h-5 text-[#434343]" />
                </span>
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
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
            <div className="flex justify-center items-center">
              <button className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#F8F8F8] px-8 py-3 text-sm font-light text-[#434343] shadow-sm">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
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
            </div>

            <div className="text-[#949494] flex flex-wrap justify-center gap-x-[5px] text-[14px]">
              Already have an account?
              <Link to="/login" className="text-[#FE4101] font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
