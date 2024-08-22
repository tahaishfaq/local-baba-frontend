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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response?.data?.token); 
      setUser(response.data.user);
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

  const logout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      console.error("Logout failed", error);
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
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyOTP, resendOTP }}>
      {children}
    </AuthContext.Provider>
  );
};
