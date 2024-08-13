import React from "react";
import phones from "../assets/Mobile.png";
import badge from "../assets/Mobile app store badge.png";
import badge2 from "../assets/Play store badge.png";

const Download = () => {
  return (
    <div className="bg-gradient-to-r from-[#FE4101] to-[#EC7434] flex flex-col lg:flex-row items-center justify-between text-white ">
      <div className="max-w-lg lg:ml-28 text-center lg:text-left ">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Download Local Baba app!
        </h1>
        <p className="text-base lg:text-lg mb-6">
          Enhance Your Experience By Downloading One Of The Top Delivery Apps
          Available. Many Companies Are Now Choosing Mobile App Development For
          Food Delivery Services.
        </p>
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8 mb-8">
          <div>
            <span className="text-2xl font-bold">★ 4.4</span>
            <p className="text-sm">51 Reviews</p>
          </div>
          <div>
            <span className="text-2xl font-bold">10K+</span>
            <p className="text-sm">App Downloads</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <img
            src={badge2}
            alt="Google Play"
            className="h-12 mx-auto lg:mx-0"
          />
          <img src={badge} alt="App Store" className="h-12 mx-auto lg:mx-0" />
        </div>
      </div>
      <div className="lg:mr-20">
        <img
          src={phones}
          alt="Phones"
          className="w-full object-cover object-center "
        />
      </div>
    </div>
  );
};

export default Download;
