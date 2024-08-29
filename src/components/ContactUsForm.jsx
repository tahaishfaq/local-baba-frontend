import React from "react";

const ContactUsForm = () => {
  return (
    <div className="bg-white pt-8 md:pt-12 font-figtree">
      <section className="mx-auto max-w-[1440px] space-y-20">
        <div className="text-[64px] font-bold text-[#0D4041]">
          <h2 className="">Get in touch with us.</h2>
          <p className="">We’re here to assist you.</p>
        </div>

        <form className="mx-auto space-y-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="focus:ring-0 focus:outline-none border-[#CACACA]  border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
              />
            </div>
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="focus:ring-0 focus:outline-none border-[#CACACA]  border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
              />
            </div>
            <div>
              <label className="block text-[#004744] font-light text-lg mb-1">
                Phone Number (optional)
              </label>
              <input
                type="text"
                className="focus:ring-0 focus:outline-none border-[#CACACA]  border-t-0 border-x-0 focus:border-[#004744] w-full px-0"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#004744] font-light text-lg mb-1">
              Message
            </label>
            <textarea
              rows={3}
              className="focus:ring-0 focus:outline-none border-[#CACACA]  border-t-0 border-x-0 focus:border-[#004744] w-full  px-0"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#FE4101] text-white py-4 px-[32px] rounded-full font-normal text-sm "
          >
            Leave us a Message
          </button>
        </form>
      </section>

      <section className="mt-16 bg-gray-50 rounded-lg py-[80px] ">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-8 md:gap-14">
            <div className="max-w-xs flex flex-col items-start space-y-5">
              <h4 className="font-normal text-xl sm:text-2xl md:text-[24px] lg:text-[24px] text-[#0D4041] mb-2">
                Contact Info
              </h4>

              <p className="text-[#0D4041] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
                We are always happy to assist you
              </p>
            </div>
            <div className="w-full max-w-xs pt-10">
              <h4 className="text-xl sm:text-2xl md:text-[22px] lg:text-[22px] font-medium text-[#0D4041] mb-4">
                Email Address
                <br />
                <span>-</span>
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-[22px] lg:text-[22px] font-medium mb-4">
                help@info.com
              </p>

              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Monday – Friday: 6am to 8pm EST
              </p>
            </div>
            <div className="w-full max-w-xs pt-10">
              <h4 className="text-xl sm:text-2xl md:text-[22px] lg:text-[22px] font-medium text-[#0D4041] mb-4">
                Number
                <br />
                <span>-</span>
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-[22px] lg:text-[22px] font-medium mb-4">
                (800) 998-94256
              </p>

              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-light">
                Monday – Friday: 6 am to 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsForm;
