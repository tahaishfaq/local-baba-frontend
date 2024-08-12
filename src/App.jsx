import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails";
import ItemPage from "./pages/ItemDetail/ItemDetail";
import OrderSummary from "./pages/OrderSummary/OrderSummary";
import LoginPage from "./pages/LoginPage/LoginPage";
import TermsConditionPage from "./pages/TermsConditionPage/TermsConditionPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import SeeAllPage from "./pages/SeeAllPage/SeeAllPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/order-summary" element={<OrderSummary />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/terms&condition" element={<TermsConditionPage/>} />
        <Route path="/aboutus" element={<AboutUsPage/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/SeeAll" element={<SeeAllPage/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;