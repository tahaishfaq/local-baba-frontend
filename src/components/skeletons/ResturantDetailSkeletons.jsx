import React from "react";

const RestaurantCardDetailSkeleton = () => {
  const skeletonRows = Array.from({ length: 3 }); // Creating 3 rows of skeletons
  const skeletonItems = Array.from({ length: 5 }); // Each row will have 5 skeleton items

  return (
    <div className="space-y-[70px] max-w-[1440px] mx-auto py-[120px] font-figtree">
      {skeletonRows.map((_, rowIndex) => (
        <div key={rowIndex} className="space-y-4 ">
          <div className="flex justify-between items-center mx-4 border-b pb-[40px]">
            <div className="flex items-center space-x-4">
              <div className="w-[114px] h-[90px] bg-gray-300 rounded-[13px] animate-pulse"></div>
              <div className="flex flex-col items-start gap-y-1">
                <div className="w-36 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
              </div>
            </div>
            <div className="w-24 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[24px]  pt-[30px]">
            {skeletonItems.map((_, itemIndex) => (
              <div
                key={itemIndex}
                className="bg-white drop-shadow-lg rounded-[14px] p-[14px] border animate-pulse"
              >
                <div className="w-full h-52 bg-gray-300 rounded-[14px]"></div>
                <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mt-4"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse mt-2"></div>
                <div className="w-full h-10 bg-gray-300 rounded mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCardDetailSkeleton;
