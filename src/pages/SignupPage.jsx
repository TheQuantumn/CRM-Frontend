import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });

      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
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
      Create Your Account 🚀
    </h3>

    <form onSubmit={handleSignup}>
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
          placeholder="Choose a username"
          autoFocus
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

      <div className="mb-3">
        <label
          className="form-label"
          style={{
            color: "#7c4dff",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Password
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Create a password"
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

      {error && (
        <div
          className="alert alert-danger text-center py-2 mb-3"
          style={{
            fontSize: "0.9rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-100"
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
        Sign Up
      </button>
    </form>

    <p
      className="text-center mt-3 mb-0"
      style={{
        fontSize: "0.9rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      Already have an account?{" "}
      <a
        href="/login"
        className="fw-semibold"
        style={{ color: "#e100ff", textDecoration: "none" }}
      >
        Log in
      </a>
    </p>
  </>
);
}

export default SignupPage;
