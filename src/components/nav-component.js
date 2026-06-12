import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logout();
    localStorage.removeItem("user");
    setCurrentUser(null);
    history.push("/");
  };

  const activeLinkStyle = {
    borderBottom: "3px solid white",
    fontWeight: "bold",
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 LearnHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-1">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeStyle={activeLinkStyle}
              >
                Home
              </NavLink>
            </li>

            {!currentUser && (
              <>
                <li className="nav-item mx-1">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    activeStyle={activeLinkStyle}
                  >
                    Register
                  </NavLink>
                </li>

                <li className="nav-item mx-1">
                  <NavLink
                    to="/login"
                    className="btn btn-light btn-sm px-3"
                    activeStyle={{
                      backgroundColor: "#e9ecef",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {currentUser && (
              <>
                <li className="nav-item mx-1">
                  <NavLink
                    to="/profile"
                    className="nav-link"
                    activeStyle={activeLinkStyle}
                  >
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item mx-1">
                  <NavLink
                    to="/course"
                    className="nav-link"
                    activeStyle={activeLinkStyle}
                  >
                    Courses
                  </NavLink>
                </li>

                {currentUser?.role === "instructor" && (
                  <li className="nav-item mx-1">
                    <NavLink
                      to="/postCourse"
                      className="btn btn-warning btn-sm"
                      activeStyle={{
                        boxShadow: "0 0 10px rgba(255,193,7,0.6)",
                        transform: "translateY(-1px)",
                      }}
                    >
                      Post Course
                    </NavLink>
                  </li>
                )}

                {currentUser?.role === "student" && (
                  <li className="nav-item mx-1">
                    <NavLink
                      to="/enroll"
                      className="btn btn-success btn-sm"
                      activeStyle={{
                        boxShadow: "0 0 10px rgba(25,135,84,0.6)",
                        transform: "translateY(-1px)",
                      }}
                    >
                      My Enrollments
                    </NavLink>
                  </li>
                )}

                <li className="nav-item dropdown ms-3">
                  <span
                    className="badge bg-light text-dark px-3 py-2"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    {currentUser.username}
                  </span>
                </li>

                <li className="nav-item ms-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
