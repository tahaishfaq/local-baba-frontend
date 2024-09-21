import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import NavBar from "../../components/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const json = {
        password: values.newPassword,
      };
      try {
        axiosInstance
          .put("/auth/password/reset", json)
          .then((res) => {
            console.log(res?.data);
            toast.success("Password Reset Successfully");
            setTimeout(() => {
              navigate("/login")
            }, 500);
          })
          .catch((err) => {
            setErrors({ general: err.response.data.message });
            toast.error(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
        setErrors({ general: error.response?.data?.message || "An error occurred" });
      } finally {
        setSubmitting(false);
        // formik.resetForm();
      }
    },
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="font-figtree">
        <NavBar />
        <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
            <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[30px]">
              <div className="flex flex-col items-start gap-y-3 lg:gap-y-6">
                <h2 className="lg:text-[36px] text-3xl font-bold text-[#0D4041]">
                  Reset Password
                </h2>
                <span className="text-[#949494] text-[14px] font-light">
                  Please enter your new password.
                </span>
              </div>

              {formik.errors.general && (
                <div className="text-red-500 text-sm mb-4">
                  {formik.errors.general}
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-[25px]">
                <div>
                  <label htmlFor="newPassword" className="sr-only">
                    New Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter New Password"
                      {...formik.getFieldProps("newPassword")}
                      className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                    />
                    <span
                      className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FiEyeOff className="w-5 h-5 text-[#434343]" />
                      ) : (
                        <FiEye className="w-5 h-5 text-[#434343]" />
                      )}
                    </span>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4 font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {formik.isSubmitting ? "Resetting Password..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
