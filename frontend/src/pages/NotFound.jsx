import React from "react";

const NotFound = () => {
  return (
    <div className="absolute inset-0 bg-[#222] flex justify-center items-center text-white">
      <div className="flex items-center justify-center gap-x-5">
        <span className="text-4xl">404</span>
        <div className="border-r h-[40px] border-white"></div>
        <span>This page could not be found</span>
      </div>
    </div>
  );
};

export default NotFound;
