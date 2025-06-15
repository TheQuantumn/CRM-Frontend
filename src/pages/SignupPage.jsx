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
      <h3 className="text-center mb-4" style={{ color: "#FF78AC" }}>
        Create Your Account 🚀
      </h3>

      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </div>

        {error && (
          <div
            className="alert alert-danger text-center py-2 mb-3"
            style={{ fontSize: "0.9rem" }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#A8D5E3", color: "#000", fontWeight: "bold" }}
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
        Already have an account?{" "}
        <a href="/login" className="fw-semibold" style={{ color: "#FF78AC" }}>
          Log in
        </a>
      </p>
    </>
  );
};

export default SignupPage;
