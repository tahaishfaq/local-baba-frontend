import React from "react";
import bg from "../assets/AboutImage.jpeg";
import image from "../assets/sideimage.png";
import { GoVerified } from "react-icons/go";
import testimonial from "../assets/testimonials.png";
import image2 from "../assets/Become a part..png";

const testimonials = [
  {
    name: "Jane Doe",
    designation: "Head of Marketing",
    image: testimonial,
  },
  {
    name: "John Doe",
    designation: "Testimonal Role",
    image: testimonial,
  },
  {
    name: "Sophia Doe",
    designation: "Lead Developer",
    image: testimonial,
  },
];
const steps = [
  {
    number: "No. 1",
    text: "Register as seller",
    subtext: "(Partner)",
  },
  {
    number: "No. 2",
    text: "Enjoy your work at",
    subtext: "Local Baba",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white font-figtree lg:space-y-[80px] space-y-10">
      {/* Hero Section */}
      <section
        className="relative text-center py-12 bg-cover bg-center lg:min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center gap-y-[30px]">
          <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            About Us
          </h1>
          <p className=" text-white max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-4xl text-base sm:text-xl md:text-2xl lg:text-[36px] lg:leading-[2.8rem] font-normal ">
            “At Local Baba, our mission is to deliver fresh, delicious meals to
            your doorstep, making healthy eating convenient and accessible for
            everyone.”
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lg:py-[80px] py-0 max-w-[1280px] mx-auto ">
        <div className="text-center mb-[60px]">
          <p className="font-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0D4041]">
            We are changing the game
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px] text-center lg:px-0 px-6">
          <div className="border border-[#D4D2E3] p-10 rounded-[15px]">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-[#0D4041] ">
              5000<span className="text-[#FE4101]">+</span>
            </h2>
            <p className="mt-2 text-[#434343] font-light text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectet adipiscing eli
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-10 rounded-[15px]">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-[#0D4041] ">
              32<span className="text-[#FE4101]">M</span>
            </h2>
            <p className="mt-2 text-[#434343] font-light text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectet adipiscing eli
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-10 rounded-[15px]">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-[#0D4041] ">
              125<span className="text-[#FE4101]">+</span>
            </h2>
            <p className="mt-2 text-[#434343] font-light text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectet adipiscing eli
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-10 rounded-[15px]">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-[#0D4041] ">
              240<span className="text-[#FE4101]">+</span>
            </h2>
            <p className="mt-2 text-[#434343] font-light text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectet adipiscing eli
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-[80px] lg:gap-[100px] items-center">
          <div className="order-2 md:order-1">
            <img
              src={image}
              alt="Our Story"
              className=" shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="order-2 md:order-2 p-4 md:p-6 lg:p-8 max-w-lg ">
            <div className="mb-6 lg:mb-8 flex flex-col items-start gap-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-[#0D4041]">
                Our Delicious Journey: A Taste of Our Story
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#434343] font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
                sit phasellus mollis sit aliquam, sit nullam.
              </p>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-3">
                <div>
                  <GoVerified className="text-[#FE4101] w-5 h-5" />
                </div>
                <div className="text-[#434343]">
                  <span className="font-medium text-base lg:text-lg">
                    Quality:{" "}
                  </span>
                  <span className="font-light text-sm lg:text-base">
                    We use only the freshest ingredients sourced from local
                    farms.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <div>
                  <GoVerified className="text-[#FE4101] w-5 h-5" />
                </div>
                <div className="text-[#434343]">
                  <span className="font-medium text-base lg:text-lg">
                    Sustainability:{" "}
                  </span>
                  <span className="font-light text-sm lg:text-base">
                    We are committed to eco-friendly practices, from our
                    packaging to our delivery methods.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="lg:py-[100px] py-[20px] font-figtree space-y-[60px] lg:px-0  md:px-0 px-4">
        <div className="text-center space-y-[16px]">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#0D4041]">
            What our clients say
          </h2>
          <p className="w-full md:w-4/5 lg:w-1/3 mx-auto text-sm sm:text-base md:text-lg text-[#434343] font-light">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Semper dalar
            elementum tempus hac tellus libero accumsan.
          </p>
        </div>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 sm:p-6 md:p-8 rounded-[12px] bg-[#F9F9FF]"
              >
                <p className="mb-4 text-sm sm:text-base md:text-lg lg:text-[18px] text-[#434343] font-light">
                  A visual guide could be a wireframe, creative composition, or
                  information architecture. A device that enables collaboration
                  will lessen the chance of work having to be completely redone.
                </p>
                <div className="flex items-center pt-[40px]">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-[#0D4041] text-sm sm:text-base md:text-lg font-semibold">
                      {testimonial.name}
                    </h4>
                    <h3 className="text-[#949494] text-xs sm:text-sm md:text-base font-light">
                      {testimonial.designation}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="lg:py-12 py-0 w-full">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:gap-[117px] gap-8 items-center">
          <div>
            <img
              src={image2}
              alt="Join Us"
              className=" shadow-lg w-full h-auto"
            />
          </div>
          <div className="flex flex-col items-start lg:gap-y-[24px] max-w-xl lg:px-0 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D4041] mb-4">
              Join Us
            </h2>
            <p className="text-[#434343] text-sm sm:text-base md:text-lg lg:text-xl mb-6 font-light">
              Become a part of the FreshBite family and enjoy delicious meals
              delivered to your door. Follow us on social media and stay updated
              with our latest offerings.
            </p>
            <div className="flex lg:gap-x-12 gap-x-8 items-center justify-start  w-full">
              {steps.map((step, index) => (
                <div key={index} className="lg:mb-6 mb-4 sm:mb-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">
                    {step.number}
                  </h2>
                  <p className="text-[#434343] font-light text-sm sm:text-base md:text-lg mt-2">
                    {step.text}
                  </p>
                  <p className="text-[#434343] font-light text-sm sm:text-base md:text-lg">
                    {step.subtext}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
