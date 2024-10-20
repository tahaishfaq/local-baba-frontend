import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AxiosInterceptor } from "./utils/axiosInstance.js";
import { RestaurantProductProvider } from "./context/ResturantContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SellerProvider } from "./context/SellerContext.jsx";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RestaurantProductProvider>
      <AuthProvider>
        <AxiosInterceptor>
          <CartProvider>
            <SellerProvider>
              <LoadScript
                googleMapsApiKey="AIzaSyBU-Yqb6m34Z6ZWGo7ueFrm6OYmP-Ma2hU"
                libraries={libraries}
              >
                <App />
              </LoadScript>
            </SellerProvider>
          </CartProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </RestaurantProductProvider>
  </StrictMode>
);
