import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dish1 from "../assets/card1.png";
import dish2 from "../assets/card2.png";
import dish3 from "../assets/card3.png";
import dish4 from "../assets/card4.png";
import dish5 from "../assets/card5.png";
import image from "../assets/Resimage.png";
import Popover from "../components/Popover";
import { useResturant } from "../context/ResturantContext";

import { IoIosBicycle } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";
import { CartContext } from "../context/CartContext";

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

const FoodCard = ({ _id, itemName, basePrice, image, description, extras }) => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

    
  // Local state to track selected extras
  const [selectedExtras, setSelectedExtras] = useState([]);
  const navigate = useNavigate()

  // Helper to calculate the total price for an item with extras
  const calculateExtrasTotal = () => {
    return selectedExtras.reduce((total, extra) => total + extra.price, 0);
  };

  // Check if the item (with the selected extras) is already in the cart
  const itemInCart = cartItems.find(
    (item) =>
      item._id === _id &&
      JSON.stringify(item.extras) === JSON.stringify(selectedExtras)
  );

  // Handle adding/removing extras
  const handleExtraSelection = (extra) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border">
      <div className="flex flex-col sm:flex-row">
        <img
         onClick={() => handleCardClick(_id)}
          src={image}
          alt={itemName}
          className="rounded-lg w-full sm:w-1/3 cursor-pointer"
        />
        <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0 sm:ml-4">
          <div>
            <h3 className="text-lg font-semibold capitalize">{itemName}</h3>
            <p className="text-[#949494] font-normal text-sm mt-2">
              {description}
            </p>
            {/* Render available extras */}
            {extras?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Extras:</p>
                {extras.map((extra, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`extra-${extra.name}-${_id}`}
                      checked={selectedExtras.includes(extra)}
                      onChange={() => handleExtraSelection(extra)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`extra-${extra.name}-${_id}`}
                      className="text-sm"
                    >
                      {extra.name} (+₹{extra.price.toFixed(2)})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-[#434343] font-medium text-lg">
              ₹{(basePrice + calculateExtrasTotal()).toFixed(2)}
            </p>

            {/* Conditionally render buttons based on if the item is in the cart */}
            {itemInCart ? (
              <div className="flex gap-x-4 items-center">
                <button
                  onClick={() => decreaseQuantity(_id, selectedExtras)}
                  className="bg-[#FE4101] text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-medium text-lg">
                  {itemInCart.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(_id, selectedExtras)}
                  className="bg-[#FE4101] text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  addToCart(
                    { _id, itemName, basePrice, image, description },
                    1,
                    selectedExtras
                  )
                }
                className="bg-[#FE4101] text-white px-6 py-3 rounded-full border-[#D9D9D9]"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SeeAllRestaurant = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [vegFilter, setVegFilter] = useState(false); // Initial state: false (off)
  const [nonVegFilter, setNonVegFilter] = useState(false); // Initial state: false (off)

  useEffect(() => {
    axiosInstance
      .get(`global/restaurant-products/${id}`)
      .then((res) => {
        setRestaurant(res?.data);
        setCuisineOptions(res?.data?.restaurant?.cuisineType);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleCardClick = (id) => {
    navigate(`/item/${id}`);
  };

  // Handle Veg switch toggle
  const toggleVegFilter = () => {
    setVegFilter(!vegFilter);
    if (!vegFilter) {
      setNonVegFilter(false); // Disable Non-Veg when Veg is turned on
    }
  };

  // Handle Non-Veg switch toggle
  const toggleNonVegFilter = () => {
    setNonVegFilter(!nonVegFilter);
    if (!nonVegFilter) {
      setVegFilter(false); // Disable Veg when Non-Veg is turned on
    }
  };

  // Check if an item is already in the cart
  const getItemInCart = (itemId) => {
    return cartItems.find((item) => item._id === itemId);
  };

  // Filter products based on selected cuisine and food type
  const filteredProducts = restaurant?.products?.filter((item) => {
    const matchesCuisine =
      selectedCuisine.length === 0 ||
      item?.cuisineType?.toLowerCase() === selectedCuisine?.toLowerCase();

    const matchesVegFilter =
      !vegFilter || (vegFilter && item?.foodType?.toLowerCase() === "veg");

    const matchesNonVegFilter =
      !nonVegFilter ||
      (nonVegFilter && item?.foodType?.toLowerCase() === "non-veg");

    return matchesCuisine && matchesVegFilter && matchesNonVegFilter;
  });

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
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D4041] capitalize">
                {restaurant?.restaurant?.name}
              </h2>
              <p className="text-[#434343] font-normal text-base sm:text-lg">
                <span className="flex items-center gap-x-1">
                  <IoIosBicycle className="w-6 h-6" />{" "}
                  {restaurant?.restaurant?.estimatedDeliveryTime}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-lg font-medium">Veg</label>
            <div
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                vegFilter ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={toggleVegFilter}
            >
              <span
                className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                  vegFilter ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-lg font-medium">Non-Veg</label>
            <div
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                nonVegFilter ? "bg-red-500" : "bg-gray-300"
              }`}
              onClick={toggleNonVegFilter}
            >
              <span
                className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                  nonVegFilter ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
          {filteredProducts?.map((item) => {
            const itemInCart = getItemInCart(item._id);

            return (
              <div
                key={item?._id}
                className="bg-white shadow-sm rounded-xl p-4 cursor-pointer hover:border-[#FE4101CC] border"
              >
                <img
                  onClick={() => handleCardClick(item?._id)}
                  src={item.image}
                  alt={item.itemName}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-4">{item.itemName}</h3>
                <p className="text-gray-500">₹{item.basePrice}</p>

                {/* Conditionally render the Add to Cart button or Increase/Decrease buttons */}
                {itemInCart ? (
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => decreaseQuantity(item._id, [])} // No extras considered
                      className="bg-[#FE4101] text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-medium text-lg">
                      {itemInCart.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item._id, [])} // No extras considered
                      className="bg-[#FE4101] text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1, []); // Add item to cart with quantity 1, no extras considered
                    }}
                    className="mt-4 text-[#FE4101] text-base font-semibold border-[#D9D9D9] border py-2 px-4 rounded-full w-full hover:border-[#FE4101]"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div>
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
            {cuisineOptions?.[0]?.split(",").map((cuisine, index) => (
              <button
                key={index}
                className={`border border-gray-300 py-1 px-4 rounded-full text-sm hover:bg-[#FE4101] hover:text-white ${
                  selectedCuisine === cuisine.trim()
                    ? "bg-[#FE4101] text-white"
                    : ""
                }`}
                onClick={() => setSelectedCuisine(cuisine.trim())}
              >
                <span className="capitalize">{cuisine.trim()}</span>
              </button>
            ))}
          </div>

          <div className="border-t mb-9"></div>

          <div className="flex justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Veg</label>
              <div
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  vegFilter ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={toggleVegFilter}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    vegFilter ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Non-Veg</label>
              <div
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  nonVegFilter ? "bg-red-500" : "bg-gray-300"
                }`}
                onClick={toggleNonVegFilter}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    nonVegFilter ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts?.map((item) => (
              <FoodCard key={item._id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAllRestaurant;
