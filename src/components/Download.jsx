import React from "react";
import phones from "../assets/Mobile.png";
import phones2 from "../assets/mobiledownload.png";
import badge from "../assets/Mobile app store badge.png";
import badge2 from "../assets/Play store badge.png";

const Download = () => {
  return (
    <div className="bg-gradient-to-r from-[#FE4101] to-[#EC7434] flex flex-row items-center justify-between text-white  pr-0 pl-3 lg:py-0 lg:px-28">
      <div className="lg:max-w-lg lg:w-full w-[40%] text-start lg:text-left mt-2 lg:mt-0">
        <h1 className="text-lg md:text-4xl lg:text-5xl font-bold mb-2 lg:mb-4">
          Download Local Baba app!
        </h1>
        <p className="text-xs md:text-lg mb-6 hidden lg:block ">
          Enhance Your Experience By Downloading One Of The Top Delivery Apps
          Available. Many Companies Are Now Choosing Mobile App Development For
          Food Delivery Services.
        </p>
        <p className="text-xs md:text-lg lg:mb-6 mb-2 lg:hidden md:hidden block ">
          Enhance your experience by downloading one of the top delivery apps
          available.
        </p>
        <div className="flex flex-row items-center justify-start  space-x-2 sm:space-x-8 mb-0 lg:mb-8">
          <div className="text-left">
            <span className="lg:text-2xl text-sm  font-bold">★ 4.4</span>
            <p className="text-[10px] lg:text-sm">51 Reviews</p>
          </div>
          <div className="text-left">
            <span className="lg:text-2xl text-sm font-bold">10K+</span>
            <p className="text-[10px] lg:text-sm">App Downloads</p>
          </div>
        </div>
        <div className="flex  flex-row items-center justify-start space-x-2 sm:space-x-4 py-3">
          <img src={badge2} alt="Google Play" className="lg:h-12  mx-0 h-6" />
          <img src={badge} alt="App Store" className="lg:h-12 mx-0 h-6" />
        </div>
      </div>
      <div className="">
        <img
          src={phones}
          alt="Phones"
          className="hidden lg:block lg:w-auto  lg:object-cover object-center"
        />
      </div>
      <div className="">
        <img
          src={phones2}
          alt="Phones"
          className="w-full h-[220px] lg:hidden  "
        />
      </div>
    </div>
  );
};

export default Download;
