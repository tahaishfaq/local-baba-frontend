import React from "react";
import { BiSearch } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center pt-[60px] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center py-2.5 px-4 bg-white border border-[#FE4101] rounded-lg sm:rounded-full shadow-md">
        <div className="flex flex-col sm:flex-grow sm:flex-row items-center w-full sm:mb-0 mb-4">
          <div className="flex items-center w-full rounded-lg sm:rounded-none sm:rounded-l-full px-3 py-2 border-[#FE4101] mb-2 sm:mb-0">
            <BiSearch className="text-[#FE4101] mr-2" size={24} />
            <input
              type="text"
              placeholder="Search for food"
              className="w-full outline-none focus:ring-0 bg-transparent border-0"
            />
          </div>

          <div className="hidden sm:block h-7 border-r border-black mx-4" />

          <div className="flex items-center w-full rounded-lg sm:rounded-none sm:rounded-r-full px-3 py-2 border-[#FE4101]">
            <FiMapPin className="text-[#FE4101] mr-2" size={24} />
            <input
              type="text"
              placeholder="Search by Location"
              className="w-full outline-none focus:ring-0 bg-transparent border-0"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto text-[14px] bg-[#FE4101] text-white font-light px-7 py-3 rounded-full shadow-sm hover:bg-[#e03901] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE4101] sm:ml-4"
        >
          Search
        </button>
      </div>
    </div>
  );
}
