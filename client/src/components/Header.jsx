import React from "react";
import NavLink from "./NavLink";

const Header = () => {
  return (
    <div className="h-[90px] max-w-[1200px] mx-auto border-b-[1px] border-gray-300">
      <div className="flex justify-between p-8">
        {" "}
        <div> Text Summarizer Logo </div>
        <div>
          <ul className="flex gap-x-2">
            <NavLink to="/files" title="My Files" />
            <NavLink to="/login" title="Login" />
            <NavLink to="/register" title="Sign up" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
