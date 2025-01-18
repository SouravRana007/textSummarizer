import React from "react";
import { useNavigate } from "react-router-dom";

const NavLink = ({ to, title }) => {
  const navigate = useNavigate();
  return (
    <button className="btn btn-ghost" onClick={() => navigate(to)}>
      {title}
    </button>
  );
};

export default NavLink;
