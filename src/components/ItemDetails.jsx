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

// const CartItem = ({ item }) => {
//   const { increaseQuantity, decreaseQuantity } = useContext(CartContext);

//   return (
//     <div className="flex items-start space-x-4 p-4 border-b shadow-md rounded-lg">
//       <img
//         src={item.image}
//         alt={item.itemName}
//         className="w-[120px] h-[106px] object-cover rounded-lg"
//       />
//       <div className="flex-1 flex flex-col justify-between">
//         <div>
//           <h3 className="text-sm font-semibold text-[#434343] mb-1 capitalize">
//             {item.itemName}
//           </h3>
//           <p className="text-xs font-semibold text-[#434343] mb-1">
//             {item?.description}
//           </p>
//         </div>
//         <div className="flex items-center justify-between mt-auto">
//           <p className="text-sm font-medium text-[#434343]">
//             ₹{(item.basePrice * item.quantity).toFixed(2)}
//           </p>
//           <div className="flex gap-x-4 items-center">
//             <span
//               onClick={() => decreaseQuantity(item._id)}
//               className="bg-[#fe400171] px-2 rounded-md text-white cursor-pointer"
//             >
//               -
//             </span>
//             <span>{item.quantity}</span>
//             <span
//               onClick={() => increaseQuantity(item._id)}
//               className="bg-[#FE4101] px-2 rounded-md text-white cursor-pointer"
//             >
//               +
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [resturantId, setResturantId] = useState("");
  const [bestSellingProduct, setBestSellingProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/global/product-details/${id}`
        );
        console.log("singleItem", response);
        setProduct(response.data.product);
        setResturantId(response?.data?.product?.restaurant?._id);
        setBestSellingProduct(response?.data?.product?.restaurant?.products);
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

  //   useEffect(() => {
  // try {
  //   if(resturantId){
  //     axiosInstance.get("").then((res) => {
  //       console.log("best selling pro", res);
  //     })
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  //   },[resturantId])

  const closePopover = () => setShowPopover(false);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] py-6 animate-pulse lg:px-0 px-4">
        <div className="grid grid-cols-1">
          <div className="mb-14">
            <div className="h-10 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded mb-6 w-full"></div>
            <div className="flex space-x-4 mb-6">
              <div className="bg-gray-200 rounded-full h-10 w-40"></div>
              <div className="bg-gray-200 rounded-full h-10 w-40"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-200 rounded-lg h-56"></div>
            <div className="bg-gray-200 rounded-lg h-56"></div>
            <div className="bg-gray-200 rounded-lg h-56"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="mx-auto max-w-[1440px] lg:py-[15px] py-[30px] lg:px-0 px-4">
      <div className="grid grid-cols-1 space-y-14">
        <div className="lg:space-y-7 space-y-6">
          <div className="max-w-lg space-y-4">
            <h1 className="lg:text-4xl text-2xl font-bold text-[#0D4041]  capitalize">
              {product.itemName}
            </h1>
            <img
              src={product?.image}
              alt="product"
              className="bg-gray-100 w-full h-80"
            />
          </div>
          <div className="lg:space-y-3 space-y-1">
            <h3 className="text-[#434343] font-semibold lg:text-lg text-base">
              Description
            </h3>
            <p className="text-[#949494] font-medium lg:text-sm  text-xs">
              {product.description}
              {/* <span className="text-[#FE4101] font-medium text-sm">
            {" "}
            Read more...
          </span> */}
            </p>
          </div>
          <div className="flex lg:flex-row flex-col items-start gap-4">
            {/* <button className="bg-white text-[#FE4101] border border-[#FE4101] py-4 lg:w-1/4 w-full px-4 font-medium text-sm rounded-full">
              Self Pickup
            </button> */}
            <button
              className="bg-[#FE4101] text-white py-4 lg:w-1/4 w-full px-4 font-medium text-sm rounded-full"
              onClick={() => handleAddToCartClick(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="lg:space-y-9 space-y-6">
          <div className="flex justify-between items-center ">
            <h2 className="lg:text-4xl text-2xl font-semibold text-[#434343]">
              Best Sellings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-col-5 gap-4 mb-6">
            {bestSellingProduct?.map((item) => (
              <div key={item._id}>
                <div
                  className="bg-white shadow-sm rounded-lg p-3 border"
                  onClick={() => handleAddToCartClick(item)}
                >
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-[182px] object-cover rounded-lg mb-5"
                  />
                  <h3 className="text-[#0D4041] text-base font-semibold mb-3">
                    {item.itemName}
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
      </div>

      {showPopover && <Popover onClose={closePopover} item={selectedItem} />}
    </div>
  );
};

export default ItemDetails;
