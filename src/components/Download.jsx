import React from "react";
import phones from "../assets/Mobile.png";
import badge from "../assets/Mobile app store badge.png";
import badge2 from "../assets/Play store badge.png";

const Download = () => {
  return (
    <div className="bg-gradient-to-r from-[#FE4101] to-[#EC7434] flex flex-col-reverse lg:flex-row items-center justify-between text-white pb-8 px-8 lg:py-0 lg:px-28">
      <div className="max-w-lg text-center lg:text-left mt-8 lg:mt-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Download Local Baba app!
        </h1>
        <p className="text-base md:text-lg mb-6">
          Enhance Your Experience By Downloading One Of The Top Delivery Apps
          Available. Many Companies Are Now Choosing Mobile App Development For
          Food Delivery Services.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
          <div className="text-center lg:text-left">
            <span className="text-2xl font-bold">★ 4.4</span>
            <p className="text-sm">51 Reviews</p>
          </div>
          <div className="text-center lg:text-left">
            <span className="text-2xl font-bold">10K+</span>
            <p className="text-sm">App Downloads</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <img
            src={badge2}
            alt="Google Play"
            className="h-12 mx-auto lg:mx-0"
          />
          <img
            src={badge}
            alt="App Store"
            className="h-12 mx-auto lg:mx-0"
          />
        </div>
      </div>
      <div className=" w-full lg:w-auto">
        <img
          src={phones}
          alt="Phones"
          className="w-full lg:w-auto object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Download;
