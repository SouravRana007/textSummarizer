import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-300/50 backdrop-blur-sm">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </div>
  );
};

export default Loader;
