import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CartContext } from "../context/CartContext";
import Popover from "./Popover";
import Dish1 from "../assets/Dish1.png";
import Dish2 from "../assets/Dish2.png";
import Dish3 from "../assets/Dish3.png";

const foodItems = [
  {
    id: 1,
    description:
      "Indulge in the aromatic flavors of chicken biryani, a beloved dish.",
    name: "Chicken Biryani",
    basePrice: 100,
    image: Dish1,
  },
  {
    id: 2,
    description: "Savor the crispy and juicy delights of Korean Fried Chicken.",
    name: "Korean Fried Chicken",
    basePrice: 1000,
    image: Dish2,
  },
  {
    id: 3,
    description:
      "Enjoy a classic pizza topped with fresh ingredients and melted cheese.",
    name: "Pizza",
    basePrice: 1000,
    image: Dish3,
  },
];

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="flex items-start space-x-4 p-4 border-b shadow-md rounded-lg">
      <img
        src={item.image}
        alt={item.itemName}
        className="w-[120px] h-[106px] object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#434343] mb-1 capitalize">
            {item.itemName}
          </h3>
          <p className="text-xs font-semibold text-[#434343] mb-1">
            {item?.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-sm font-medium text-[#434343]">
            ₹{(item.basePrice * item.quantity).toFixed(2)}
          </p>
          <div className="flex gap-x-4 items-center">
            <span
              onClick={() => decreaseQuantity(item._id)}
              className="bg-[#fe400171] px-2 rounded-md text-white cursor-pointer"
            >
              -
            </span>
            <span>{item.quantity}</span>
            <span
              onClick={() => increaseQuantity(item._id)}
              className="bg-[#FE4101] px-2 rounded-md text-white cursor-pointer"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("totalCartItems", cartItems);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/global/product-details/${id}`
        );
        console.log("singleProduct", response.data.product);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mx-auto max-w-[1440px] py-6">
      <div className="grid grid-cols-1 ">
        {/* Product Details Section */}
        <div className="">
          <div className="mb-14">
            <h1 className="text-4xl font-bold text-[#0D4041] mb-14 capitalize">
              {product.itemName}
            </h1>
            {/* <img src={product.image} alt="product" className="" /> */}
            <h3 className="text-[#434343] font-semibold text-base mb-3">
              Description
            </h3>
            <p className="text-[#949494] font-medium text-sm mb-10">
              {product.description}
              <span className="text-[#FE4101] font-medium text-sm">
                {" "}
                Read more...
              </span>
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                className="bg-[#FE4101] text-white py-4 px-36 font-medium text-sm rounded-full"
                onClick={() => handleAddToCartClick(product)}
              >
                Add to Cart
              </button>
              <button className="bg-white text-[#FE4101] border border-[#FE4101] py-4 px-36 font-medium text-sm rounded-full">
                Self Pickup
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-9">
            <h2 className="text-4xl font-semibold text-[#434343]">
              Best Sellings
            </h2>
            <button className="text-[#949494] font-medium text-sm border border-[#949494] rounded-full px-4 py-3">
              See All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {foodItems.map((item) => (
              <div key={item.id}>
                <div
                  className="bg-white shadow-lg rounded-lg p-4"
                  onClick={() => handleAddToCartClick(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[182px] object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-[#0D4041] text-xl font-semibold mb-3">
                    {item.name}
                  </h3>
                  <p className="text-[#434343] font-normal text-base mb-5">
                    ₹{item.basePrice}
                  </p>
                  <button
                    className="bg-[#FE4101] text-white py-2 px-4 rounded-lg w-full"
                    onClick={() => handleAddToCartClick(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-1">
          <h2 className="text-[#434343] text-3xl font-semibold mb-6">Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 p-4 bg-[#FE4101E5] rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Sub-Total</span>
              <span className="text-sm font-medium text-white">
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.basePrice * item.quantity,
                  0
                )}
              </span>
            </div>
            <div className="w-full border-t border-[#FFFFFF] my-4"></div>
            <button className="bg-white text-[#FE4101] font-medium text-base py-2 px-4 rounded-full w-full">
              Place My Order
            </button>
          </div>
        </div> */}
      </div>

      {/* Popover */}
      {showPopover && <Popover onClose={closePopover} item={selectedItem} />}
    </div>
  );
};

export default ItemDetails;
