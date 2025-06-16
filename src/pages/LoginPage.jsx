import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://jobtracker-backend-nx24.onrender.com/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/jobs");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
<h3
  className="text-center mb-4"
  style={{
    color: "#e100ff",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    fontSize: "1.8rem",
  }}
>
  Welcome Back 👋
</h3>

<form onSubmit={handleLogin}>
  <div className="mb-3">
    <label
      className="form-label"
      style={{
        color: "#7c4dff",
        fontWeight: "600",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      Username
    </label>
    <input
      type="text"
      className="form-control"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      placeholder="Enter your username"
      style={{
        backgroundColor: "#f3e9ff",
        border: "1px solid #7c4dff",
        borderRadius: "12px",
        padding: "12px",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
      }}
    />
  </div>

  <div className="mb-3" style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    className="form-control"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    placeholder="Enter your password"
    style={{
      backgroundColor: "#f3e9ff",
      border: "1px solid #7c4dff",
      borderRadius: "12px",
      padding: "12px 45px 12px 12px", // right padding for icon
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      width: "100%",
    }}
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    tabIndex={-1}
    style={{
      position: "absolute",
      top: "50%",
      right: "12px",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#7c4dff",
      fontSize: "1.2rem",
      cursor: "pointer",
    }}
  >
    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
  </button>
</div>


  <button
    type="submit"
    className="w-100 mt-3"
    style={{
      background: "linear-gradient(135deg, #7f00ff, #e100ff)",
      color: "#fff",
      fontWeight: "600",
      fontSize: "1.1rem",
      border: "none",
      borderRadius: "30px",
      padding: "12px",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 0 12px rgba(129, 0, 255, 0.6)",
      transition: "all 0.3s ease",
    }}
  >
    Log In
  </button>
</form>


      <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
        Don't have an account?{" "}
        <a href="/signup" className="fw-semibold" style={{ color: "#FF78AC" }}>
          Sign up
        </a>
      </p>
    </>
  );
};

export default LoginPage;
