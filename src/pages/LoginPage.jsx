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
      const res = await axios.post("http://localhost:8080/api/auth/login", {
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
      <h3 className="text-center mb-4" style={{ color: "#FF78AC" }}>
        Welcome Back 👋
      </h3>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              style={{ display: "flex", alignItems: "center" }}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
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
