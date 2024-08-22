import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "sonner";

export default function OTP() {
  const { verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const result = await verifyOTP(enteredOtp);
    if (result.success) {
      toast.success("Login succeefully!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      console.log(result.message);
      toast.error(result.message);
    }
  };

  // const handleResend = async () => {
  //   const result = await resendOTP();
  //   if (result.success) {
  //     toast.success("OTP Resent to your email");
  //   } else {
  //     console.log(result.message);
  //     toast.error(result.message);
  //   }
  // };

  return (
    <>
    <Toaster richColors position="top-center" />
    <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8 font-figtree">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
        <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[30px]">
          <div className="flex flex-col items-start gap-y-6">
            <h2 className="text-[36px] font-bold text-[#0D4041] ">Enter OTP</h2>
            <span className="text-[#949494] text-[14px] font-light">
              Enter the 4-digit code that you received on your email.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-[35px] pt-6">
            <div className="flex gap-x-[40px] items-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-[89px] h-[89px] text-center text-2xl rounded-[13px] border border-gray-300 "
                />
              ))}
            </div>

            {/* <div className="text-center font-normal text-[#949494]">
              OTP not received?{" "}
              <span  onClick={handleResend} className="text-[#FE4101]">
                Resend
              </span>
            </div> */}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4  font-normal leading-6 text-white shadow-sm"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
