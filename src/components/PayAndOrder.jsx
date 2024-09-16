import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { BsCash } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PayAndOrder = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default to Cash on Delivery
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]); // State to store fetched states
  const [shippingInfo, setShippingInfo] = useState({
    streetAddress: "",
    zipCode: "",
    state: "",
  });
  const [orderNotes, setOrderNotes] = useState("");
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  );
  const deliveryCharges = 50;
  const discount = 10;
  const total = subtotal + deliveryCharges - discount;

  const { user } = useAuth();
  console.log("user", user);

  // Fetch states of India
  useEffect(() => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: "India",
      })
      .then((response) => {
        setStates(response.data.data.states);
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  const handlePlaceOrder = async () => {
    if (paymentMethod === "online") {
      // If Razorpay is selected, initiate the payment process
      await handleRazorpayPayment();
    } else {
      // Proceed with Cash on Delivery order placement
      await placeOrder("cod");
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      if (!window.Razorpay) {
        toast.error("Payment gateway is not loaded. Please try again later.");
        setLoading(false);
        return;
      }

      // Ensure the amount is converted to paise and is an integer
      const amountInPaise = Math.round(total * 100); // Convert the total amount to paise (INR * 100)

      // Create an order on the server
      const { data: orderData } = await axiosInstance.post(
        "/payment/create-order",
        {
          amount: amountInPaise, // Send amount in paise
        }
      );

      const options = {
        key: "rzp_test_qA3Fj4OcAMNXbG", // Your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "local baba",
        description: "Test Transaction",
        image: "https://example.com/your_logo", // Replace with your logo URL
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment on the server
          try {
            const { data: verificationData } = await axiosInstance.post(
              "/payment/verify-payment",
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            );

            if (verificationData.success) {
              await placeOrder("online", response); // Place the order if payment is successful
              toast.success("Payment successful and order placed!");
            } else {
              toast.error("Payment verification failed. Please try again.");
            }
          } catch (verificationError) {
            console.error("Error verifying payment:", verificationError);
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: user.name, // Prefill user details
          email: user.email, // Prefill user details
          contact: user.contact || "9999999999", // Use user's contact or a default value
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#FE4101", // Customize the theme color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Razorpay payment:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (method, razorpayResponse = null) => {
    const orderData = {
      orderItem: cartItems.map((item) => ({
        name: item.itemName,
        price: item.basePrice,
        quantity: item.quantity,
        image: item.image,
        product: item._id,
      })),
      paymentInfo: {
        status: method === "cod" ? "unpaid" : "paid",
        paymentMethod: method,
        id: razorpayResponse?.razorpay_payment_id,
        // razorpayOrderId: razorpayResponse?.razorpay_order_id,
        // razorpaySignature: razorpayResponse?.razorpay_signature,
      },
      paidAt: new Date().toISOString(),
      itemsPrice: subtotal,
      taxPrice: 1.5,
      shippingPrice: deliveryCharges,
      totalPrice: total,
      shippingInfo: shippingInfo,
      orderNotes: orderNotes,
    };

    try {
      await axiosInstance.post("user/place-order", orderData).then((res) => {
        toast.success("Order Placed Successfully");
        console.log("order",res);
        localStorage.setItem("orderOTP", res?.data?.newOrder?.otp)
        localStorage.setItem("deliveryTime", res?.data?.deliveryTime)
        clearCart();
        setTimeout(() => {
          navigate("/order-progress");
        }, 500);
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response.data.message);
    }
  };

  const [savedAddresses, setSavedAddresses] = useState([])

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  

  const handleSaveAddress = () => {
    console.log(shippingInfo);
    if (
      !shippingInfo.streetAddress || 
      !shippingInfo.zipCode ||
      !shippingInfo.state 
    ) {
      toast.error("Please fill in all required fields before saving the address.");
      return;
    }

    // Save the new address
    const updatedAddresses = [...savedAddresses, shippingInfo];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("shippingAddresses", JSON.stringify(updatedAddresses));
    toast.success("Address saved successfully!");
  };

  useEffect(() => {
    const savedAddressesFromStorage =
      JSON.parse(localStorage.getItem("shippingAddresses")) || [];
    setSavedAddresses(savedAddressesFromStorage);

    if (savedAddressesFromStorage.length > 0) {
      setShippingInfo(savedAddressesFromStorage[0]);
    }
  }, []);

  const handleAddressSelect = (e) => {
    const selectedAddress = JSON.parse(e.target.value);
    setShippingInfo(selectedAddress);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-[1440px] py-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-semibold text-[#0D4041]">
                Shipping Address
              </h2>

              {/* Address Dropdown */}
              <div className="mt-4">
                <label className="block text-[#0D4041] font-normal mb-2">
                  Select Saved Address
                </label>
                <select
                  onChange={handleAddressSelect}
                  className="block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm font-light"
                >
                  <option value="">Select an Address</option>
                  {JSON.parse(localStorage.getItem("shippingAddresses"))?.map(
                    (address, index) => (
                      <option key={index} value={JSON.stringify(address)}>
                        {address.streetAddress}, {address.state},{" "}
                        {address.zipCode}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Address Form */}
              <div className="mt-4 space-y-6">
                <div>
                  <label className="block text-[#0D4041] font-normal mb-2">
                    Street Address
                  </label>
                  <textarea
                    name="streetAddress"
                    placeholder="Enter Street Address"
                    value={shippingInfo.streetAddress}
                    onChange={handleShippingInfoChange}
                    className="block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm font-light"
                    rows="3"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-[#0D4041] font-normal mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      className="block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm font-light"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-[#0D4041] font-normal mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      className="block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm font-light"
                    >
                      <option>Select</option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  className="mt-4 w-full sm:w-auto px-8 py-3 bg-[#FE4101] text-white rounded-full"
                  onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              </div>
            </div>

            <div className="border-t"></div>

            {/* Additional Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Additional Info
              </h2>
              <div>
                <label className="block text-[#0D4041] font-normal mt-8 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="orderNotes"
                  placeholder="Notes About Your Order, E.G. Special Notes For Delivery"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[#434343] focus:ring-1 focus:ring-inset focus:ring-[#FE4101] sm:text-sm font-light"
                  rows="4"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="lg:p-6 py-6 px-4 border rounded-lg space-y-6">
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
                    <div className="border-b pb-2">
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

                  <div className="py-6 px-4 border rounded-lg bg-[#FE4101] text-white">
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-4">
                      <label
                        className={`flex items-center space-x-2 font-light p-3 rounded-lg ${
                          paymentMethod === "cash"
                            ? "border-2 border-white"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="text-[#434343]"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>
                          <BsCash />
                        </span>
                        <span>Cash On Delivery</span>
                      </label>
                      <label
                        className={`flex items-center space-x-2 font-light p-3 rounded-lg ${
                          paymentMethod === "online"
                            ? "border-2 border-white"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          className="text-[#434343]"
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
        className="w-20 h-18 sm:w-24 sm:h-20 object-cover rounded-lg bg-gray-100"
      />
      <div className="flex-1 gap-y-2 flex flex-col">
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold text-[#434343] mb-1 capitalize">
            {item.itemName}
          </h3>
          <p className="text-xs  font-semibold text-[#434343] mb-1 w-28 lg:w-48 truncate">
            {item?.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#434343]">
            ₹{(item.basePrice * item.quantity).toFixed(2)}
          </p>
          <div className="flex gap-x-2 sm:gap-x-4 items-center">
            <span
              onClick={() => decreaseQuantity(item._id)}
              className="bg-[#fe400171] w-5 h-5 rounded-md text-white cursor-pointer text-sm text-center"
            >
              -
            </span>
            <span className="text-sm">{item.quantity}</span>
            <span
              onClick={() => increaseQuantity(item._id)}
              className="bg-[#FE4101] w-5 h-5 rounded-md text-white cursor-pointer text-sm text-center"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
