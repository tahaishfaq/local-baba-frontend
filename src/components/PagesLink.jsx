import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();

  // Split the pathname into an array of paths
  const pathnames = location?.pathname?.split("/").filter((x) => x);

  return (
    <div className="max-w-[1440px] mx-auto pt-[60px] pb-[30px]">
    <div className="px-4">
      <ol className="list-reset flex text-[#434343] lg:text-base text-sm">
        <li>
          <Link to="/" className="">
            Home
          </Link>
        </li>
        {pathnames?.map((value, index) => {
          const isLast = index === pathnames?.length - 1;
          const to = `/${pathnames?.slice(0, index + 1).join("/")}`;

          return (
            <li key={to} className="flex items-center capitalize">
              <span className="mx-2 text-[#949494]"><IoIosArrowForward /></span>
              {isLast ? (
                <span className="text-[#FE4101]">
                {`${decodeURIComponent(value.trim()).slice(0, 4)}...${decodeURIComponent(value.trim()).slice(-4)}`}
              </span>              
              ) : (
                <span  className="text-[#FE4101]">
                  {decodeURIComponent(value)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
    </div>
  );
};

export default BreadCrumb;
