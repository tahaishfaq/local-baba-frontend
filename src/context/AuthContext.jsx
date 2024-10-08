import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      
      // Save user and token in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response?.data?.token);
      setUser(response.data.user);
  
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem("location", JSON.stringify({ latitude, longitude }));
  
            // Send coordinates to the /global/location API
            try {
              await axiosInstance.post(
                "/global/location",
                { latitude, longitude },
                {
                  headers: {
                    Authorization: `Bearer ${response?.data?.token}`,
                  },
                }
              );
              console.log("Location updated successfully.");
            } catch (locationError) {
              console.error("Failed to update location", locationError);
            }
          },
          (error) => {
            console.error("Error getting location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
  
      return { success: true };
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: error.response?.data?.message };
    }
  };
  
  

  const sellerLogin = async (credentials) => {
    try {
      const response = await axiosInstance.post("/restaurant/login", credentials);
      console.log(response);
      localStorage.setItem("resturant", JSON.stringify(response.data.restaurant));
      localStorage.setItem("sellerToken", response?.data?.token); 
      // setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const register = async (registrationData) => {
    try {
      const response = await axiosInstance.post("/user/register", registrationData);
      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const sellerRegister = async (registrationData) => {
    try {
      const response = await axiosInstance.post("/restaurant/register", registrationData);
      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      return { success: true };
    } catch (error) {
      console.error("Logout failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const verifySellerOTP = async (otp) => {
    try {
      const response = await axiosInstance.put("/auth/verify-otp", { OTP: otp });
      console.log("OTP Verified", response?.data);
      localStorage.setItem("resturant", JSON.stringify(response.data.user));
      localStorage.setItem("sellerToken", response?.data?.token); 
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error("OTP Verification failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const verifyOTP = async (otp) => {
    try {
      const response = await axiosInstance.put("/auth/verify-otp", { OTP: otp });
      console.log("OTP Verified", response?.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response?.data?.token); 
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error("OTP Verification failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  const resendOTP = async (email) => {
    try {
      const response = await axiosInstance.post("/auth/resend-otp", { email });
      console.log("OTP Resent", response?.data);
      return { success: true };
    } catch (error) {
      console.error("Resend OTP failed", error);
      return { success: false, message: error.response.data.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, verifyOTP, resendOTP, sellerRegister, sellerLogin, verifySellerOTP }}>
      {children}
    </AuthContext.Provider>
  );
};
