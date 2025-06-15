import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname;

  // Crystal-inspired color palette
  const navStyle = {
    background: "linear-gradient(90deg,rgb(53, 29, 209),rgb(161, 7, 178))", // light cyan to lavender
    fontFamily: "Poppins, sans-serif",
    padding: "12px 0",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  const buttonBaseStyle = {
    border: "1px solid white",
    color: "white",
    backgroundColor: "transparent",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 500,
    fontSize: "16px",
    transition: "all 0.3s ease",
  };

  const activeButtonStyle = {
    backgroundColor: "white",
    color: "#00acc1", // cool crystal blue
    border: "1px solid #00acc1",
    boxShadow: "0 2px 8px rgba(0, 172, 193, 0.3)",
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav d-flex flex-row gap-4">
          <li className="nav-item">
            <button
              style={{
                ...buttonBaseStyle,
                ...(activePath === "/jobs" ? activeButtonStyle : {}),
              }}
              onClick={() => navigate("/jobs")}
            >
              Job Listings
            </button>
          </li>
          <li className="nav-item">
            <button
              style={{
                ...buttonBaseStyle,
                ...(activePath === "/my-applications" ? activeButtonStyle : {}),
              }}
              onClick={() => navigate("/my-applications")}
            >
              My Applications
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
