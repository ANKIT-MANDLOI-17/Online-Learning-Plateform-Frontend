import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Learn New Skills Online 🚀</h1>

          <p className="lead mt-4 mb-4">
            Build your future with high-quality online courses. Learn MERN
            Stack, React, Node.js, MongoDB and much more.
          </p>

          <Link to="/course" className="btn btn-light btn-lg px-4 me-3">
            Explore Courses
          </Link>

          <Link to="/register" className="btn btn-outline-light btn-lg px-4">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h1>📚</h1>
                <h4 className="fw-bold">Quality Courses</h4>
                <p className="text-muted">
                  Learn from practical and real-world projects.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h1>👨‍🏫</h1>
                <h4 className="fw-bold">Expert Instructors</h4>
                <p className="text-muted">
                  Learn from experienced developers and educators.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h1>🎯</h1>
                <h4 className="fw-bold">Career Growth</h4>
                <p className="text-muted">
                  Gain skills that help you land better opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="container mb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card h-100 border-0 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #212529, #343a40)",
                color: "white",
              }}
            >
              <div className="card-body p-5">
                <h2 className="fw-bold">🎓 For Students</h2>

                <p className="mt-3">
                  Browse available courses, enroll instantly, and start learning
                  at your own pace.
                </p>

                <Link to="/register" className="btn btn-outline-light">
                  Join as Student
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-lg">
              <div className="card-body p-5">
                <h2 className="fw-bold">👨‍🏫 For Instructors</h2>

                <p className="mt-3">
                  Create courses, share your knowledge, and teach students
                  around the world.
                </p>

                <Link to="/register" className="btn btn-primary">
                  Become an Instructor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mb-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h2 className="fw-bold text-primary">100+</h2>
            <p>Courses</p>
          </div>

          <div className="col-md-4">
            <h2 className="fw-bold text-success">1000+</h2>
            <p>Students</p>
          </div>

          <div className="col-md-4">
            <h2 className="fw-bold text-danger">50+</h2>
            <p>Instructors</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 border-top text-muted">
        © 2026 LearnHub • Built with React, Node.js and MongoDB
      </footer>
    </div>
  );
};

export default HomeComponent;
