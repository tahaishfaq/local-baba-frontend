import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AxiosInterceptor } from "./utils/axiosInstance.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AxiosInterceptor>
        <App />
      </AxiosInterceptor>
    </AuthProvider>
  </StrictMode>
);
