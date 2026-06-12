import React from "react";
import { Redirect } from "react-router-dom";

const ProfileComponent = ({ currentUser }) => {
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg border-0"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Cover Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
            height: "180px",
          }}
        ></div>

        {/* Profile Content */}
        <div className="card-body text-center position-relative">
          {/* Avatar */}
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto shadow"
            style={{
              width: "120px",
              height: "120px",
              fontSize: "42px",
              fontWeight: "bold",
              marginTop: "-80px",
              border: "5px solid white",
            }}
          >
            {currentUser.username?.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-3 fw-bold">{currentUser.username}</h2>

          <span
            className={`badge ${
              currentUser.role === "instructor"
                ? "bg-warning text-dark"
                : "bg-success"
            } px-3 py-2`}
          >
            {currentUser.role?.toUpperCase()}
          </span>

          <p className="text-muted mt-3">Welcome to LearnHub 🚀</p>

          <hr />

          {/* User Information */}
          <div className="row text-start mt-4">
            <div className="col-md-6 mb-3">
              <strong>User ID</strong>
              <p className="text-muted">{currentUser._id}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Email</strong>
              <p className="text-muted">{currentUser.email}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Account Type</strong>
              <p className="text-muted">{currentUser.role}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status</strong>
              <p className="text-success">Active</p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h3>📚</h3>
                  <h5>Courses</h5>
                  <p className="text-muted">View your learning journey</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h3>🎯</h3>
                  <h5>Goals</h5>
                  <p className="text-muted">Track your progress</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h3>🏆</h3>
                  <h5>Achievements</h5>
                  <p className="text-muted">Earn badges and certificates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Specific Section */}
          {currentUser.role === "instructor" && (
            <div className="alert alert-warning mt-4">
              👨‍🏫 You are registered as an Instructor. You can create and manage
              courses.
            </div>
          )}

          {currentUser.role === "student" && (
            <div className="alert alert-success mt-4">
              🎓 You are registered as a Student. Browse and enroll in courses.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
