import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#F2F2F2]">
        <div
          style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }} // Smooth transition
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FE4101]"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
