import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        
        {/* <div className="text-right">
          <span className="text-xs font-semibold inline-block text-orange-500">
            {progress}%
          </span>
        </div> */}
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
