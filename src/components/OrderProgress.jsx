import React, { useRef } from "react";

const OrderProgress = () => {
  const inputRefs = useRef([]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8 font-figtree">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
        <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[60px]">
          <div className="flex flex-col items-center gap-y-6">
            <h2 className="text-3xl font-bold text-[#0D4041]">
              Order In Progress
            </h2>
            <span className="text-[#949494] text-[14px] font-light">
              Your order is arriving in {localStorage.deliveryTime}  mins. Receive your OTP now
            </span>
          </div>

          <div className="border rounded-xl px-6 py-8 shadow-sm flex flex-col items-start gap-y-6">
            <div className="flex  justify-between items-center w-full">
              <span className="text-[#949494] text-[16px] font-light">
                Arriving In {localStorage.deliveryTime} Mins
              </span>
              <button
                onClick={() => console.log("Get OTP clicked")}
                className="text-[#FE4101] text-sm text-[16px] font-normal"
              >
                Get OTP
              </button>
            </div>

            <div className="relative w-full">
              <div className="h-[10px] bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#FE4101] rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-[35px] ">
            <div className="flex gap-x-[40px] justify-center items-center">
              {localStorage?.orderOTP?.split("").map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  readOnly
                  className="w-[89px] h-[89px] text-center text-2xl rounded-[13px] border border-gray-300"
                />
              ))}
            </div>

            {/* <div className="text-center font-normal text-[#949494]">
              OTP not received?{" "}
              <span onClick={() => console.log("Resend OTP")} className="text-[#FE4101]">
                Resend
              </span>
            </div> */}

            <div className="pt-6">
              <button
                type="button" // Button type is correct here
                className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4 font-normal leading-6 text-white shadow-sm"
                onClick={() => console.log("Next step")} // Replace with your actual handler
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
