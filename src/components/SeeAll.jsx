import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dish1 from "../assets/card1.png";
import dish2 from "../assets/card2.png";
import dish3 from "../assets/card3.png";
import dish4 from "../assets/card4.png";
import dish5 from "../assets/card5.png";
import image from "../assets/Resimage.png";
import Popover from "../components/Popover";
import { useResturant } from "../context/ResturantContext";
import axiosInstance from "../utils/axiosInstance";

const foodItems = [
  {
    id: 1,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish1,
  },
  {
    id: 2,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish2,
  },
  {
    id: 3,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish3,
  },
  {
    id: 4,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish4,
  },
  {
    id: 5,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish5,
  },
  {
    id: 6,
    name: "Korean Fried Chicken",
    about:
      "Korean fried chicken is a popular dish known for its crispy and flavorful fried chicken pieces, coated in a sweet and spicy sauce.",
    price: "₹1000",
    image: dish1,
  },
];

const FoodCardSkeleton = () => (
  <div className="bg-white shadow-lg rounded-lg p-4 animate-pulse">
    <div className="bg-gray-200 h-32 sm:h-48 rounded-lg"></div>
    <div className="mt-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="mt-4 h-8 bg-gray-200 rounded"></div>
  </div>
);

const SeeAllRestaurantSkeleton = () => {
  return (
    <div className="space-y-12 p-4 sm:p-8 md:p-24">
      <div className="space-y-4 mb-10 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between px-4 mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-16 sm:w-28 sm:h-24 bg-gray-200 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-4 sm:gap-x-24 px-4">
          {["Delivery Time", "Rating", "No of Employees", "Working Hours"].map(
            (label, index) => (
              <div className="mb-4 sm:mb-0 flex-1" key={index}>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-16"></div>
              </div>
            )
          )}
        </div>

        <div className="my-4 sm:my-10 space-y-2 pt-10 px-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  pt-10">
          {[...Array(5)].map((_, index) => (
            <FoodCardSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-9 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-8 bg-gray-200 rounded-full w-20"></div>
        ))}
      </div>

      <div className="h-2 bg-gray-200 rounded mb-9"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(6)].map((_, index) => (
          <FoodCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const FoodCard = ({ _id, itemName, basePrice, image, description }) => (
  <Link
    to={`/item/${_id}`}
    className="bg-white shadow-sm rounded-lg p-4 border"
  >
    <div className="flex flex-col sm:flex-row">
      <img src={image} alt={itemName} className="rounded-lg w-full sm:w-1/3" />
      <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0 sm:ml-4">
        <div>
          <h3 className="text-lg font-semibold capitalize">{itemName}</h3>
          <p className="text-[#949494] font-normal text-sm mt-2">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#434343] font-medium text-lg mt-2">
            ₹{basePrice}
          </p>
          <button className=" bg-[#FE4101] text-white px-4 py-2 rounded-full border-[#D9D9D9] mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </Link>
);

const SeeAllRestaurant = () => {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`global/restaurant-products/${id}`)
      .then((res) => {
        console.log("single", res?.data);
        setRestaurant(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const { selectedRestaurant } = useResturant();

  const rows = [foodItems.slice(0, 5)];

  const handleAddToCart = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  const handleCardClick = (id) => {
    console.log("id", id);
    navigate(`/item/${id}`);
  };

  const [selectedCuisine, setSelectedCuisine] = useState("");

  // Filter products based on selected cuisine type
  const filteredProducts = restaurant?.products?.filter((item) =>
    selectedCuisine
      ? item?.cuisineType?.toLowerCase() === selectedCuisine?.toLowerCase()
      : true
  );

  const formatOperatingHours = (hours) => {
    const [start, end] = hours?.split("-");

    const convertToAmPm = (time) => {
      const period = parseInt(time) >= 12 ? "PM" : "AM";
      const formattedTime = parseInt(time) % 12 || 12;
      return `${formattedTime}${period}`;
    };

    const formattedStart = convertToAmPm(start);
    const formattedEnd = convertToAmPm(end);

    return `Open from ${formattedStart} to ${formattedEnd}`;
  };

  return loading ? (
    <SeeAllRestaurantSkeleton />
  ) : (
    <div className="space-y-16 mx-auto max-w-[1440px] lg:py-24 py-16  lg:px-0 px-4 ">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex items-center gap-x-4">
            <img
              src={restaurant?.restaurant?.image}
              alt="Restaurant"
              className="w-20 h-16 sm:w-28 sm:h-24 rounded-xl bg-gray-100"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D4041]">
                {restaurant?.restaurant?.name}
              </h2>
              <p className="text-[#434343] font-normal text-base sm:text-lg">
                {restaurant?.restaurant?.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-4 sm:gap-x-24 ">
          <div className="mb-4 sm:mb-0">
            <p className="text-[#434343] font-semibold text-lg sm:text-xl">
              Delivery Time
            </p>
            <p className="text-[#949494] font-normal text-sm sm:text-base">
              {restaurant?.restaurant?.estimatedDeliveryTime}
            </p>
          </div>

          <div className="hidden sm:block border-r border-[#9494944D]"></div>

          <div className="mb-4 sm:mb-0">
            <p className="text-[#434343] font-semibold text-lg sm:text-xl">
              Rating
            </p>
            <p className="text-[#949494] font-normal text-sm sm:text-base">
              {restaurant?.restaurant?.ratings?.toFixed(1)} (
              {restaurant?.restaurant?.totalReview})
            </p>
          </div>

          <div className="hidden sm:block border-r border-[#9494944D]"></div>

          <div className="mb-4 sm:mb-0">
            <p className="text-[#434343] font-semibold text-lg sm:text-xl">
              No of Employees
            </p>
            <p className="text-[#949494] font-normal text-sm sm:text-base">
              {restaurant?.restaurant?.noOfEmployees}
            </p>
          </div>

          <div className="hidden sm:block border-r border-[#9494944D]"></div>

          <div className="mb-4 sm:mb-0">
            <p className="text-[#434343] font-semibold text-lg sm:text-xl">
              Working Hours
            </p>
            {restaurant?.restaurant?.operatingHours && (
              <p className="text-[#949494] font-normal text-sm sm:text-base">
                {formatOperatingHours(restaurant?.restaurant?.operatingHours)}
              </p>
            )}
          </div>
        </div>

        <div className="">
          <p className="text-[#949494] font-normal text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            laborum assumenda molestias quae, distinctio accusamus corporis ad
            dolor doloribus! In similique explicabo deleniti eaque incidunt non
            ea consequuntur numquam placeat!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-[#434343] font-semibold text-2xl sm:text-3xl ">
          Best Sellings
        </h1>
        <div className="border-t"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {restaurant?.topSellingProducts?.map((item) => (
            <div
              key={item?._id}
              className="bg-white shadow-sm rounded-xl p-4 cursor-pointer hover:border-[#FE4101CC] border"
              onClick={() => handleCardClick(item?._id)}
            >
              <img
                src={item.image}
                alt={item.itemName}
                className="w-full h-32 sm:h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4">{item.itemName}</h3>
              <p className="text-gray-500">₹{item.basePrice}</p>
              <button
                // onClick={(e) => {
                //   e.stopPropagation();
                //   handleAddToCart();
                // }}
                className="mt-4 text-[#FE4101] text-base font-semibold border-[#D9D9D9] border py-2 px-4 rounded-full w-full hover:border-[#FE4101]"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPopover && <Popover onClose={handleClosePopover} />}

      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-9">
            All Cuisines
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-9">
          <button
            className={`border border-gray-300 py-1 px-4 rounded-full text-sm hover:bg-[#FE4101] hover:text-white ${
              selectedCuisine === "" ? "bg-[#FE4101] text-white" : ""
            }`}
            onClick={() => setSelectedCuisine("")}
          >
            All
          </button>
          {["Chicken", "Pizza", "Burger", "Sandwich", "Sushi", "Dessert"].map(
            (cuisine, index) => (
              <button
                key={index}
                className={`border  py-1 px-4 rounded-full text-sm hover:bg-[#FE4101] hover:text-white ${
                  selectedCuisine === cuisine ? "bg-[#FE4101] text-white" : ""
                }`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </button>
            )
          )}
        </div>

        <div className="border-t mb-9"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts?.map((item) => (
            <FoodCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeAllRestaurant;
