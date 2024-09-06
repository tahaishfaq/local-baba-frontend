import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axiosInstance from "../utils/axiosInstance";
import { toast, Toaster } from "sonner";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await axiosInstance.get(`/global/popular-search`);
          const filteredSuggestions = response.data.popularSearches.filter(
            (item) =>
              item.productId.itemName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.productId.itemName);
    navigate(`/item/${suggestion.productId._id}`);
  };

  const handleSelect = async (value) => {
    setAddress(value);
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      console.log("latLng",latLng);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error getting coordinates:", error);
    }
  };

  const handleSearch = () => {
    if (coordinates.lat && coordinates.lng) {
      navigate(`/nearby-restaurants/${coordinates.lat}/${coordinates.lng}`);
    } else {
      toast.error("Please select a location.");
    }
  };

  return (
    <>
    <Toaster richColors position="top-center"/>
    <div className="flex items-center justify-center pt-[60px] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center py-2.5 px-4 bg-white border border-[#FE4101] rounded-lg sm:rounded-full shadow-md relative">
        <div className="flex flex-col sm:flex-grow sm:flex-row items-center w-full sm:mb-0 mb-4">
          <div className="flex items-center w-full rounded-lg sm:rounded-none sm:rounded-l-full px-3 py-2 border-[#FE4101] mb-2 sm:mb-0 relative">
            <BiSearch className="text-[#FE4101] mr-2" size={24} />
            <input
              type="text"
              placeholder="Search for food"
              className="w-full outline-none focus:ring-0 bg-transparent border-0"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click event
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-[#FE4101] hover:text-white"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.productId.itemName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block h-7 border-r border-black mx-4" />

          <div className="flex items-center w-full rounded-lg sm:rounded-none sm:rounded-r-full px-3 py-2 border-[#FE4101]">
            <FiMapPin className="text-[#FE4101] mr-2" size={24} />
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={{
                componentRestrictions: { country: "in" }, // Restrict to India
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="w-full relative">
                  <input
                    {...getInputProps({
                      placeholder: "Search by Location",
                      className:
                        "w-full outline-none focus:ring-0 bg-transparent border-0",
                    })}
                  />
                  <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? "cursor-pointer bg-[#FE4101] text-white px-4 py-2"
                        : "cursor-pointer bg-white text-black px-4 py-2";
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                          key={index}
                        >
                          <div className="flex items-center">
                          <FiMapPin className="mr-2" />
                          {suggestion.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto text-[14px] bg-[#FE4101] text-white font-light px-7 py-3 rounded-full shadow-sm hover:bg-[#e03901] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE4101] sm:ml-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
    </>
  );
}
