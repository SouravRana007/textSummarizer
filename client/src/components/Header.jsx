import React, { useState } from "react";
import NavLink from "./NavLink";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../api/auth";
import Avatar from "./Avatar";
import { toast } from "react-toastify";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isLoggedIn = Boolean(userQuery.data?.data?.id);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.log("logout err: ", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="h-[90px] max-w-[1200px] mx-auto border-b-[1px] border-gray-300">
      <div className="flex justify-between p-8">
        {" "}
        <div> Text Summarizer Logo </div>
        {!userQuery.isLoading && (
          <div>
            <ul className="flex gap-x-2 items-center">
              {isLoggedIn ? (
                <>
                  <NavLink to="/files" title="My Files" />
                  <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <Avatar name={userQuery.data.data.name} />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-20 mt-2 w-48  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        onClick={handleLogout}
                        className="btn flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {/* <LogOut className="w-4 h-4 mr-2" /> */}
                        Logout
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/login" title="Login" />
                  <NavLink to="/register" title="Sign up" />
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
