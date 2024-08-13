import React from "react";
import NavBar from "../../components/NavBar";
import ItemDetails from "../../components/ItemDetails";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/BreadCrumb";

const ItemDetail = () => {
  return (
    <div className="">
      <NavBar />
      <Breadcrumb/>
      <ItemDetails />
      <Footer />
    </div>
  );
};

export default ItemDetail;
