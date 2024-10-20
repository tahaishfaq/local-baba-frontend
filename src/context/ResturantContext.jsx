import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

// Create the context
export const RestaurantContext = createContext();

export const useResturant = () => {
    return useContext(RestaurantContext);
  };

export const RestaurantProductProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [topRestaurants, setTopRestaurants] = useState([]);

  useEffect(() => {
    
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get("global/all-restaurants");
        console.log(response.data.restaurants)
        setRestaurants(response.data.restaurants);
        setLoadingRestaurants(false);
        
      } catch (error) {
        console.error("Failed to fetch restaurants", error);
        setLoadingRestaurants(false);
        setLoadingProducts(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    
    const fetchTopRestaurants = async () => {
      try {
        const response = await axiosInstance.get("global/discounted-restaurants");
        console.log(response);
        setTopRestaurants(response.data.discountedRestaurants);
        setLoadingRestaurants(false);
        
      } catch (error) {
        console.error("Failed to fetch restaurants", error);
        setLoadingRestaurants(false);
        setLoadingProducts(false);
      }
    };

    fetchTopRestaurants();
  }, []);

  

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        loadingRestaurants,
        topRestaurants
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
