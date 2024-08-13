import React from "react";

const ContactUsForm = () => {
  return (
    <div className="bg-white py-8 md:py-12">
      {/* Contact Form Section */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D4041]">
            Get in touch with us.
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#0D4041] font-bold">
            We’re here to assist you.
          </p>
        </div>

        <form className="mx-auto space-y-4 mb-16 max-w-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Phone Number (optional)"
              className="border border-gray-300 p-3 rounded-md w-full"
            />
          </div>
          <textarea
            placeholder="Message"
            className="border border-gray-300 p-3 rounded-md w-full h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-[#FE4101] text-white py-3 px-6 rounded-full font-semibold text-lg"
          >
            Leave us a Message
          </button>
        </form>
      </section>

      {/* Contact Info Section */}
      <section className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="bg-gray-50 py-6 md:py-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-8 md:gap-14">
            <div className="w-full md:w-1/3">
              <h4 className="font-normal text-xl sm:text-2xl md:text-3xl text-[#0D4041] mb-2">
                Contact Info
              </h4>

              <p className="text-[#0D4041] font-bold text-2xl sm:text-3xl md:text-4xl">
                We are always happy to assist you
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0D4041] mb-4">
                Email Address
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                help@info.com
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-normal">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-normal">
                Monday – Friday; 6 am to 8 pm EST
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0D4041] mb-4">
                Number
              </h4>
              <p className="text-[#0D4041] text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                (800) 998-94256
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-normal">
                Assistance hours:
              </p>
              <p className="text-[#0D4041] text-base sm:text-lg md:text-xl font-normal">
                Monday – Friday; 6 am to 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsForm;
