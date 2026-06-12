import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setMessage("");

    if (!username || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await AuthService.register(username, email, password, role);

      alert("Registration successful! Please login.");

      history.push("/login");
    } catch (error) {
      setMessage(error?.response?.data || "Registration failed.");
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
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Create Account</h2>

            <p className="text-muted">Join LearnHub today 🚀</p>
          </div>

          {message && <div className="alert alert-danger">{message}</div>}

          <div className="mb-3">
            <label className="form-label">Username</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>

            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>

              <option value="instructor">Instructor</option>
            </select>
          </div>

          <button
            onClick={handleRegister}
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="text-center mt-4">
            <span className="text-muted">Already have an account?</span>

            <Link to="/login" className="ms-2 text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
