import React from "react";

const Avatar = ({ name }) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-green-700 text-neutral-content w-10 rounded-full cursor-pointer">
        <span className="text-md">{(name[0] || "").toUpperCase()}</span>
      </div>
    </div>
  );
};

export default Avatar;
