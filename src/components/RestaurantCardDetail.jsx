import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Popover from "../components/Popover";
import { IoIosBicycle } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";

const RestaurantCardDetail = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { latitude, longitude } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const json = {
      latitude: latitude,
      longitude: longitude,
    };

    axiosInstance
      .put(`/global/near-by`, json)
      .then((res) => {
        console.log("Nearby Restaurants:", res?.data);
        if (res?.data?.nearByRestaurants === "No restaurants found") {
          setRestaurants([]);
        } else {
          setRestaurants(res?.data?.nearByRestaurants);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [latitude, longitude]);

  const handleAddToCart = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  const handleCardClick = (restaurantId) => {
    navigate(`/see-resturant-products/${restaurantId}`);
  };

  return (
    <div className="space-y-[70px] max-w-[1440px] mx-auto py-[120px] font-figtree">
      {/* Restaurant Details */}
      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse flex justify-between items-center mx-4 border-b pb-[40px]">
            <div className="flex items-center space-x-4">
              <div className="w-[114px] h-[90px] rounded-[13px] bg-gray-200"></div>
              <div className="space-y-2">
                <div className="w-32 h-6 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
          </div>
        ) : restaurants?.length > 0 ? (
          restaurants?.map((restaurant, index) => (
            <div
              className="flex justify-between items-center mx-4 border-b pb-[40px]"
              key={index}
              onClick={() => handleCardClick(restaurant?._id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={restaurant?.image}
                  alt="Restaurant"
                  className="w-[114px] h-[90px] rounded-[13px] bg-gray-100"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#0D4041] capitalize">
                    {restaurant?.name}
                  </h2>
                  <span className="text-[#434343] font-normal flex items-center gap-x-1 text-lg">
                    <IoIosBicycle className="w-5 h-5" />
                    23-24 Min
                  </span>
                </div>
              </div>
              <button
                className="text-[#949494] px-12 py-3 border rounded-full border-[#949494]"
                onClick={() => handleCardClick(restaurant?._id)}
              >
                See All
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <span>No Restutrant</span>
          </div>
        )}

        {/* Product Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[24px] pt-[30px]">
          {loading
            ? Array(5)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white drop-shadow-lg rounded-[14px] p-[14px] border animate-pulse"
                  >
                    <div className="w-full h-52 bg-gray-200 rounded-[14px]"></div>
                    <div className="mt-4 space-y-2">
                      <div className="w-32 h-6 bg-gray-200 rounded"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-10 bg-gray-200 rounded mt-4"></div>
                    </div>
                  </div>
                ))
            : restaurant?.products?.products?.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="bg-white drop-shadow-lg rounded-[14px] p-[14px] cursor-pointer border"
                  onClick={() => handleCardClick(item._id)}
                >
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-52 object-cover object-center rounded-[14px]"
                  />
                  <h3 className="text-lg font-semibold mt-4 text-[#0D4041]">
                    {item.itemName}
                  </h3>
                  <p className="text-[#434343]">{item.basePrice}</p>
                  <button
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   handleAddToCart();
                    // }}
                    className="my-4 text-[#FE4101] text-base font-medium border-[#D9D9D9] border py-2 px-4 rounded-[8px] w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
        </div> */}
      </div>

      {showPopover && <Popover onClose={handleClosePopover} />}
    </div>
  );
};

export default RestaurantCardDetail;
