import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import indian from "../assets/Indian.png";
import burger from "../assets/Burger.png";
import pizza from "../assets/Pizza.png";
import chinese from "../assets/Chinese.png";
import biryani from "../assets/Biryani.png";
import cake from "../assets/Cake.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CarouselSkeleton from "../components/skeletons/CarouselSkeleton"; // Import the skeleton component

const carouselItems = [
  { id: 1, text: "Indian", image: indian },
  { id: 2, text: "Burger", image: burger },
  { id: 3, text: "Pizza", image: pizza },
  { id: 4, text: "Chinese", image: chinese },
  { id: 5, text: "Biryani", image: biryani },
  { id: 6, text: "Cake", image: cake },
  { id: 7, text: "Indian", image: indian },
  { id: 8, text: "Burger", image: burger },
  { id: 9, text: "Pizza", image: pizza },
  { id: 10, text: "Chinese", image: chinese },
  { id: 11, text: "Biryani", image: biryani },
  { id: 12, text: "Cake", image: cake },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  arrows: false, // Disable default arrows
  responsive: [
    {
      breakpoint: 1024, // Tablet screen size
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768, // Mobile screen size
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480, // Very small screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Carousel() {
  let sliderRef = React.createRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a timeout
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleNext = () => {
    sliderRef.slickNext();
  };

  const handlePrev = () => {
    sliderRef.slickPrev();
  };

  if (loading) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto py-[70px] relative font-figtree">
      <h1 className="font-bold text-4xl mb-7 text-[#434343]">
        Food Categories
      </h1>
      
      <Slider ref={(c) => (sliderRef = c)} {...settings}>
        {carouselItems?.map((item) => (
          <div key={item.id} className="px-2 flex items-center justify-center cursor-pointer">
            <div className="p-4 rounded-lg text-center flex flex-col items-center">
              <img
                src={item.image}
                alt={item.text}
                className="w-full h-40 object-contain"
              />
              <p className="mt-2 text-lg text-[#434343] font-semibold">{item.text}</p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Previous Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 transform -translate-y-1/2 -left-10 text-[#1C274C] bg-white rounded-full border p-2 text-4xl z-10 focus:outline-none shadow"
      >
        <IoIosArrowBack />
      </button>

      {/* Custom Next Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 transform -translate-y-1/2 -right-10 text-[#1C274C] bg-white rounded-full border p-2 text-4xl z-10 focus:outline-none shadow"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Carousel;
