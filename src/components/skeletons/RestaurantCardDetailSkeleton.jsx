import React from "react";

const RestaurantCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[16px] drop-shadow-lg overflow-hidden border p-[14px] animate-pulse">
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="py-4 flex flex-col items-start gap-y-2">
        <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;
