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
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OTPPage from "./pages/RegisterPage/OTPPage";
import PayAndOrderPage from "./pages/PayAndOrderPage/PayAndOrderPage";
import SellerPage from "./pages/SellerPage/SellerPage";
import SellerRegisterPage from "./pages/RegisterPage/SellerRegisterPage";
import SellerLoginPage from "./pages/LoginPage/SellerLoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/order-summary" element={<OrderSummary />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/seller-login" element={<SellerLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller-register" element={<SellerRegisterPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/terms&condition" element={<TermsConditionPage/>} />
        <Route path="/aboutus" element={<AboutUsPage/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/see-resturant-products/:id" element={<SeeAllPage/>} />
        <Route path="/payOrder" element={<PayAndOrderPage/>} />
        <Route path="/seller" element={<SellerPage/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;