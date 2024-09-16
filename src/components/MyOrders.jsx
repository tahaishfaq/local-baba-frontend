import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // Assuming you have an axios instance set up
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "sonner";
import moment from "moment";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/user/orders");
        console.log("orders", response.data.orders);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchOrders();
    // if (user) {
    // } else {
    //   toast.error("Login to get your orders");
    // }
  }, [user]);

  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <div className="text-center py-20">Loading your orders...</div>;
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        {orders?.length > 0 ? (
          <div className="space-y-8">
            {orders?.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOrderClick(order._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-[#0D4041]">
                      Order #: {order._id}
                    </h2>
                    <p className="text-gray-600">
                      Placed on:{" "}
                      {moment(order?.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <p className="text-gray-600">Item Price: ₹{order.itemsPrice}</p>
                    <p className="text-gray-600">Shipping: ₹{order.shippingPrice}</p>
                    <p className="text-gray-600">Tax: ₹{order.taxPrice}</p>
                    <p className="text-gray-600 font-semibold">Total: ₹{order.totalPrice}</p>
                  </div>
                  <div className="text-[#FE4101] font-medium">
                    {order.status}
                  </div>
                </div>
                {/* <div className="mt-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-t pt-4"
                    >
                      <div className="text-gray-700">{item.productName}</div>
                      <div className="text-gray-600">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-gray-900 font-medium">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">You have no orders.</div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
