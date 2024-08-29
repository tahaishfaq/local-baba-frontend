import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AxiosInterceptor } from "./utils/axiosInstance.js";
import { RestaurantProductProvider } from "./context/ResturantContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SellerProvider } from "./context/SellerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RestaurantProductProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <CartProvider>
            <SellerProvider>
            <App />
            </SellerProvider>
          </CartProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </RestaurantProductProvider>
  </StrictMode>
);
