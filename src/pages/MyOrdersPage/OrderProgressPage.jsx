import React from "react";
import NavBar from "../../components/NavBar";

import Footer from "../../components/Footer";
import OrderProgress from "../../components/OrderProgress";



const OrderProgressPage = () => {
  return (
    <>
      <div className="max-w-[1440] font-figtree">
        <NavBar />
       <OrderProgress/>
        <Footer />
      </div>
    </>
  );
};

export default OrderProgressPage;
