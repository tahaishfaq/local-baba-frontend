import React from 'react'

const OrderProgress = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center lg:py-12 py-0 sm:px-6 lg:px-8 font-figtree">
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[592px]">
      <div className="bg-white px-6 lg:py-12 py-0 lg:drop-shadow-md lg:rounded-[24px] sm:px-12 lg:border space-y-[30px]">
      <div className="flex flex-col items-center gap-y-6">
          <h2 className="text-3xl font-bold text-[#0D4041]">Order In Progress</h2>
          <span className="text-[#949494] text-[14px] font-light">
          Your order is arriving in 40 mins. Receive your otp now
          </span>
        </div>

        {/* <form onSubmit={handleSubmit} className="space-y-[35px] pt-6">
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

          <div className="text-center font-normal text-[#949494]">
            OTP not received?{" "}
            <span  onClick={handleResend} className="text-[#FE4101]">
              Resend
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center text-[20px] rounded-full bg-[#FE4101] px-3 py-4  font-normal leading-6 text-white shadow-sm"
            >
              Next
            </button>
          </div>
        </form> */}
      </div>
    </div>
  </div>
  )
}

export default OrderProgress