import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full lg:max-w-[1200px] mx-auto border-b-[1px] border-gray-300 px-4">
      {children}
    </div>
  );
};

export default Container;
