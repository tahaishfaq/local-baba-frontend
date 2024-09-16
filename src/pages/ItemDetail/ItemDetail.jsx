import React from "react";
import NavBar from "../../components/NavBar";
import ItemDetails from "../../components/ItemDetails";
import Footer from "../../components/Footer";
import BreadCrumb from "../../components/PagesLink";


const ItemDetail = () => {
  return (
    <div className="font-figtree">
      <NavBar />
      <BreadCrumb />
      <ItemDetails />
      <Footer />
    </div>
  );
};

export default ItemDetail;
 