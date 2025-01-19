import React, { useState } from "react";
import NavLink from "./NavLink";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../api/auth";
import Avatar from "./Avatar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: 0,
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
        <Link className="font-semibold text-xl flex items-center gap-2" to="/">
          {" "}
          Text Summarizer{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 bg-neutral text-white rounded-xl p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
          </svg>
        </Link>
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
