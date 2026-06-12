import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ setCurrentUser }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await AuthService.login(email, password);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setCurrentUser(response.data.user);

      history.push("/profile");
    } catch (error) {
      setMessage(error?.response?.data || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back 👋</h2>

            <p className="text-muted">Login to continue learning</p>
          </div>

          {message && <div className="alert alert-danger">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="text-center mt-4">
            <span className="text-muted">Don't have an account?</span>

            <Link to="/register" className="ms-2 text-decoration-none">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
