import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-[70px] relative font-figtree">
      <h1 className="font-bold text-4xl mb-7 text-[#434343]">Food Categories</h1>

      <Slider {...settings}>
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="px-2 flex items-center justify-center"
          >
            <div className="p-4 rounded-full text-center flex flex-col items-center animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-full"></div>
              <div className="mt-2 w-3/4 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSkeleton;
