import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CarouselSkeleton from "../components/skeletons/CarouselSkeleton"; 
import axiosInstance from "../utils/axiosInstance";

function Carousel() {
  let sliderRef = React.createRef();
  const [loading, setLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: carouselItems.length >= 6 ? 6 : carouselItems.length,
    slidesToScroll: carouselItems.length >= 6 ? 6 : carouselItems.length,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: carouselItems.length >= 4 ? 4 : carouselItems.length,
          slidesToScroll: carouselItems.length >= 4 ? 4 : carouselItems.length,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: carouselItems.length >= 2 ? 2 : carouselItems.length,
          slidesToScroll: carouselItems.length >= 2 ? 2 : carouselItems.length,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("global/all-categories");
        console.log("Categories", response.data);
        setCarouselItems(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setLoading(false);
      }
    };

    fetchCategories();
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
    <div className="max-w-7xl mx-auto py-[70px] relative font-figtree md:overflow-hidden  lg:px-0 px-4">
      <h1 className="font-bold lg:text-4xl text-2xl mb-7 text-[#434343]">
        Food Categories
      </h1>

      <Slider ref={(c) => (sliderRef = c)} {...settings}>
        {carouselItems?.map((item) => (
          <div
            key={item?._id}
            className="px-2 flex items-center justify-center "
          >
            <Link to={`/resturant-by-category/${item?._id}`} className="text-center flex flex-col items-center cursor-pointer">
              <img
                src={item?.image}
                alt={item?.name}
                className="lg:w-[120px] lg:h-[120px] w-20 h-20 object-cover object-top rounded-full bg-gray-100"
              />
              <p className="mt-2 lg:text-lg text-sm capitalize text-[#434343] font-semibold">
                {item?.name}
              </p>
            </Link>
          </div>
        ))}
      </Slider>

      <div className="flex items-center justify-center  lg:justify-between gap-6 lg:mt-4 mt-6 md:mt-0 md:absolute md:top-1/2 md:left-0 md:right-0 md:px-10">
        <button
          onClick={handlePrev}
          className="text-[#1C274C] bg-white rounded-full border p-1 text-3xl focus:outline-none shadow md:absolute md:-left-0 md:top-1/2 transform md:-translate-y-1/2"
        >
          <IoIosArrowBack className="w-7 h-7"/>
        </button>

        <button
          onClick={handleNext}
          className="text-[#1C274C] bg-white rounded-full border p-1 text-3xl focus:outline-none shadow md:absolute md:-right-0 md:top-1/2 transform md:-translate-y-1/2"
        >
          <IoIosArrowForward className="w-7 h-7"/>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
