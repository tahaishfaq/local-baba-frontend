import React from "react";
import bg from "../assets/AboutImage.jpeg";
import image from "../assets/sideimage.png";
import { GoVerified } from "react-icons/go";
import testimonial from "../assets/testimonials.png";
import image2 from '../assets/Become a part..png'

const testimonials = [
  {
    name: "Jane Doe",
    designation: "Head of Marketing",
    image: testimonial,
  },
  {
    name: "John Doe",
    designation: "Head of Marketing",
    image: testimonial,
  },
  {
    name: "Sophia Doe",
    designation: "Head of Marketing",
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
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="text-center py-12 bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          About Us
        </h1>
        <p className="mt-4 text-white max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
          “At Local Baba, our mission is to deliver fresh, delicious meals to
          your doorstep, making healthy eating convenient and accessible for
          everyone.”
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-12 mb-12">
        <div className="text-center mb-8">
          <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0D4041]">
            We are changing the game
          </p>
        </div>

        <div className="mx-auto container px-4 lg:px-8 max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          <div className="border border-[#D4D2E3] p-6 sm:p-8 md:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">5000+</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-6 sm:p-8 md:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">32M</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-6 sm:p-8 md:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">125+</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
          <div className="border border-[#D4D2E3] p-6 sm:p-8 md:p-10 rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">240+</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mb-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img src={image} alt="Our Story" className="rounded-lg shadow-lg w-full h-auto" />
          </div>
          <div className="order-1 md:order-2 p-4 md:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D4041] mb-4">
              Our Delicious Journey: A Taste of Our Story
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Mattis sit phasellus mollis sit aliquam sit nullam.
            </p>
            <ul className="text-gray-600 space-y-4">
              <li className="flex items-center">
                <GoVerified className="text-[#FE4101] mr-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                Quality ingredients sourced from local suppliers.
              </li>
              <li className="flex items-center">
                <GoVerified className="text-[#FE4101] mr-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                Sustainability: We are committed to eco-friendly packaging.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            What our clients say
          </h2>
          <p className="w-full md:w-4/5 lg:w-1/2 mx-auto text-sm sm:text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Semper dalar elementum tempus hac tellus libero accumsan.
          </p>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 sm:p-6 md:p-8 rounded-lg bg-[#F9F9FF]">
                <p className="mb-4 text-gray-700 text-sm sm:text-base md:text-lg">
                  A visual guide could be a wireframe, creative composition, or information architecture. A device that enables collaboration will lessen the chance of work having to be completely redone.
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-[#0D4041] text-sm sm:text-base md:text-lg font-bold">
                      {testimonial.name}
                    </h4>
                    <h3 className="text-[#949494] text-xs sm:text-sm md:text-base">
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
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={image2}
              alt="Join Us"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D4041] mb-4">Join Us</h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl mb-6">
              Become a part of the FreshBite family and enjoy delicious meals delivered to your door. Follow us on social media and stay updated with our latest offerings.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-6 lg:space-x-12">
              {steps.map((step, index) => (
                <div key={index} className="text-center mb-6 sm:mb-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FE4101]">{step.number}</h2>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg mt-2">{step.text}</p>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg">{step.subtext}</p>
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
