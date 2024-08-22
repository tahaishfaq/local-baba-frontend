import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { BsCash } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const PayAndOrder = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default to Cash on Delivery
  const [orderStatus, setOrderStatus] = useState("Processing");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );
  const deliveryCharges = 50;
  const discount = 10;
  const total = subtotal + deliveryCharges - discount;

  const handlePlaceOrder = async () => {
    const orderData = {
      orderItem: cartItems.map((item) => ({
        name: item.itemName,
        price: item.basePrice,
        quantity: item.quantity,
        image: item.image,
        product: item._id,
      })),
      paymentInfo: {
        status: "unpaid",
        paymentMethod: paymentMethod === "cash" ? "cod" : "online",
        // id: paymentMethod === "cash" ? null : "your-online-payment-id",
      },
      paidAt: new Date().toISOString(),
      itemsPrice: subtotal,
      taxPrice: 1.5,
      shippingPrice: deliveryCharges,
      totalPrice: total,
    };

    try {
      setLoading(true);
      await axiosInstance.post("user/place-order", orderData).then((res) => {
        console.log("placeOrder", res?.data);
        toast.success("Order Placed Successfully");
        clearCart();

        setTimeout(() => {
          navigate("/");
        }, 500);
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Placing Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-[1440px] py-20">
        <div className="grid grid-cols-3 ">
          <div className="col-span-2 space-y-12">
            <div className="">
              <h2 className="text-2xl font-semibold text-[#0D4041]">
                Shipping Address
              </h2>
              <div className="mt-4 space-y-6">
                <div className="w-[750px]">
                  <label className="block text-[#0D4041] font-normal mb-2">
                    Street Address
                  </label>
                  <textarea
                    placeholder="Enter Street Address"
                    className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                    rows="3"
                  />
                </div>
                <div className="flex gap-x-6 items-center">
                  <div className="w-[239px]">
                    <label className="block text-[#0D4041] font-normal mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                    />
                  </div>
                  <div className="w-[264px]">
                    <label className="block text-[#0D4041] font-normal mb-2">
                      State
                    </label>
                    <select className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light">
                      <option>Select</option>
                      <option>USA</option>
                      <option>England</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 px-[40px] py-[16px] bg-[#FE4101] text-white rounded-full ">
                  Save Address
                </button>
              </div>
            </div>

            <div className="border-t w-[750px]"></div>

            {/* Additional Info */}
            <div className="">
              <h2 className="text-2xl font-semibold text-gray-800">
                Additional Info
              </h2>
              <div className="w-[750px]">
                <label className="block text-[#0D4041] font-normal mt-8 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  placeholder="Notes About Your Order, E.G. Special Notes For Delivery"
                  className="block w-full rounded-[12px] border-0 py-[14px] px-[16px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm sm:leading-6 font-light"
                  rows="4"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="px-[30px] py-[34px] border rounded-[16px] space-y-6">
              <h2 className="text-3xl font-semibold mb-4 text-[#434343]">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>

              {cartItems?.length > 0 && (
                <>
                  <div className="space-y-3">
                    <div className="border-b">
                      <div className="flex justify-between">
                        <span>Sub-Total</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span>₹{deliveryCharges}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span>₹{discount}</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="py-[29px] px-[16px] border rounded-[22px] bg-[#FE4101] text-white">
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-2 font-light">
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="text-[#FE4101]"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>
                          <BsCash />
                        </span>
                        <span>Cash On Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2 font-light">
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="text-[#FE4101]"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>
                          <SiRazorpay />
                        </span>
                        <span>Razor Pay</span>
                      </label>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="mt-4 p-3 bg-white text-[#FE4101] rounded-full w-full font-normal"
                      >
                        {loading ? "Placing Order..." : "Place My Order"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayAndOrder;

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div className="flex items-start space-x-4 p-4 border shadow-sm rounded-lg">
      <img
        src={item.image}
        alt={item.itemName}
        className="w-[120px] h-[106px] object-cover rounded-lg bg-gray-100"
      />
      <div className="flex-1 gap-y-10 flex flex-col">
        <div className="flex flex-col items-start ">
          <h3 className="text-sm font-semibold text-[#434343] mb-1 capitalize">
            {item.itemName}
          </h3>
          <p className="text-xs font-semibold text-[#434343] mb-1 w-60 truncate">
            {item?.description}
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-sm font-medium text-[#434343]">
            ₹{(item.basePrice * item.quantity).toFixed(2)}
          </p>
          <div className="flex gap-x-4 items-center">
            <span
              onClick={() => decreaseQuantity(item._id)}
              className="bg-[#fe400171] w-5 h-5 rounded-md text-white cursor-pointer  text-sm text-center"
            >
              -
            </span>
            <span className="text-sm">{item.quantity}</span>
            <span
              onClick={() => increaseQuantity(item._id)}
              className="bg-[#FE4101] w-5 h-5  rounded-md text-white cursor-pointer text-sm text-center"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
