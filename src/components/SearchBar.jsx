import React from "react";
import { BiSearch } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center mt-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center p-4 bg-white border border-[#FE4101] rounded-lg sm:rounded-full shadow-md">
        <div className="flex flex-col sm:flex-grow sm:flex-row items-center w-full sm:w-auto mb-4 sm:mb-0">
          <div className="flex items-center w-full sm:w-auto  rounded-lg sm:rounded-none sm:rounded-l-lg px-3 py-2 border-[#FE4101] mb-2 sm:mb-0">
            <BiSearch className="text-[#FE4101] mr-2" size={24} />
            <input
              type="text"
              placeholder="Search for food"
              className="w-full sm:w-auto border-none bg-transparent "
            />
          </div>

          <div className="hidden sm:block h-10 border-r border-gray-300 mx-4" />

          <div className="flex items-center w-full sm:w-auto rounded-lg sm:rounded-none sm:rounded-r-lg px-3 py-2 border-[#FE4101]">
            <FiMapPin className="text-[#FE4101] mr-2" size={24} />
            <input
              type="text"
              placeholder="Search by Location"
              className="w-full sm:w-auto border-none bg-transparent"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full sm:w-auto bg-[#FE4101] text-white font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-[#e03901] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE4101]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
