import React from "react";
import NavBar from "../../components/NavBar";

import Footer from "../../components/Footer";
import MyOrders from "../../components/MyOrders";


const MyOrdersPage = () => {
  return (
    <>
      <div className="max-w-[1440] font-figtree">
        <NavBar />
        <MyOrders/>
        <Footer />
      </div>
    </>
  );
};

export default MyOrdersPage;
