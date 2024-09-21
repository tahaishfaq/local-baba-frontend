import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import NavBar from "../../components/NavBar";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [otpSent, setOtpSent] = useState(false); // State to toggle OTP form
  const [email, setEmail] = useState(""); // Store email for OTP verification
  const [otp, setOtp] = useState(["", "", "", ""]); // Store OTP digits
  const inputRefs = useRef([]); // Ref for OTP inputs
  const navigate = useNavigate()

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus(); // Move to next input
      }
    }
  };

  // Handle backspace in OTP inputs
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move to previous input
    }
  };

  // Submit OTP
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    try {
      const response = await axiosInstance.put("/auth/verify-otp", {
        OTP: enteredOtp,
      });
      console.log("OTP Verified", response?.data);
      localStorage.setItem("token", response?.data?.token);
      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } catch (error) {
      console.error("OTP Verification failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    // try {
    //   const res = await axiosInstance.post("/auth/resend-otp", { email });
    //   if (res.data.success) {
    //     toast.success("OTP resent successfully!");
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // } catch (error) {
    //   toast.error("Failed to resend OTP. Please try again.");
    // }
  };

  // Formik for email submission
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const json = {
        email: values.email,
      };
      setEmail(values.email); // Store email for OTP submission
      try {
        await axiosInstance.post("/auth/forget-password", json);
        toast.success("Reset password email sent successfully!");
        setOtpSent(true); // Show OTP input on successful email submission
      } catch (err) {
        setErrors({
          general: err.response?.data?.message || "Error occurred",
        });
      } finally {
        setSubmitting(false);
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
              {otpSent ? (
                // OTP Form
                <>
                  <div className="flex flex-col items-start gap-y-6">
                    <h2 className="text-[36px] font-bold text-[#0D4041] ">
                      Enter OTP
                    </h2>
                    <span className="text-[#949494] text-[14px] font-light">
                      Enter the 4-digit code that you received on your email.
                    </span>
                  </div>

                  <form
                    onSubmit={handleOTPSubmit}
                    className="space-y-[35px] pt-6"
                  >
                    <div className="flex gap-x-[40px] items-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          className="w-[89px] h-[89px] text-center text-2xl rounded-[13px] border border-gray-300 "
                        />
                      ))}
                    </div>

                    <div className="text-center font-normal text-[#949494]">
                      OTP not received?{" "}
                      <span
                        onClick={handleResendOtp}
                        className="text-[#FE4101] cursor-pointer"
                      >
                        Resend
                      </span>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4 font-normal leading-6 text-white shadow-sm"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                // Email Submission Form
                <>
                  <div className="flex flex-col items-start gap-y-3 lg:gap-y-6">
                    <h2 className="lg:text-[36px] text-3xl font-bold text-[#0D4041]">
                      Forget Password
                    </h2>
                    <span className="text-[#949494] text-[14px] font-light">
                      Please enter your email to receive a password reset link.
                    </span>
                  </div>

                  {formik.errors.general && (
                    <div className="text-red-500 text-sm mb-4">
                      {formik.errors.general}
                    </div>
                  )}

                  <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-[25px]"
                  >
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          {...formik.getFieldProps("email")}
                          className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4 font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {formik.isSubmitting ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
