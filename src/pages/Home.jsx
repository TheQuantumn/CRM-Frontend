import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import heroDecor from "../assets/heroDecor.png";
import crystal from "../assets/crystal.png";
import heroVideo from "../assets/heroVideo.mp4";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showLogin = location.pathname === "/login";
  const showSignup = location.pathname === "/signup";

  return (
    <div className="home-root">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <section className="hero-container text-center position-relative">
        {/* Background Design */}
        <img src={heroDecor} alt="Background Design" className="hero-bg" />
        
        {/* Author */}
        <p className="hero-author">DEV SNARIP</p>

        {/* Title */}
        <h1 className="hero-title">JOB TRACKER</h1>

        {/* Crystal */}
        <img src={crystal} alt="Crystal" className="crystal" />

        {/* ✨ Get Started Button */}
       <button
                className="crystal-button mt-4"
                style={{
                  zIndex: 3,
                  position: "relative",
                
                }}
                onClick={() => navigate("/login")}
              >
                
          Get Started
        </button>

       
      </section>

      {/* Modal Overlay */}
      {(showLogin || showSignup) && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div className="glass-card p-4 rounded shadow" style={{ minWidth: "400px", maxWidth: "90%" }}>
            <button className="btn-close float-end" onClick={() => navigate("/")} aria-label="Close"></button>
            {showLogin && <LoginPage />}
            {showSignup && <SignupPage />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
