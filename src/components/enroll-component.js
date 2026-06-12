import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser }) => {
  const history = useHistory();

  const [searchInput, setSearchInput] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await CourseService.getAllCourses();

      setCourses(response.data);
      setSearchResult(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);

    if (!value.trim()) {
      setSearchResult(courses);
      return;
    }

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(value.toLowerCase()),
    );

    setSearchResult(filteredCourses);
  };

  const handleEnroll = async (courseId) => {
    try {
      await CourseService.enroll(courseId);

      alert("🎉 Enrollment Successful!");

      fetchCourses();
    } catch (err) {
      alert(err?.response?.data || "Enrollment failed.");
    }
  };

  if (!currentUser) {
    return (
      <div className="container py-5">
        <div className="card shadow border-0 text-center p-5">
          <h2>Please Login First 🔐</h2>

          <p className="text-muted">
            You need to login before enrolling in courses.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => history.push("/login")}
          >
            Go To Login
          </button>
        </div>
      </div>
    );
  }

  if (currentUser.role === "instructor") {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>👨‍🏫 Instructor Account</h3>

          <p>Instructors cannot enroll in courses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Find Your Next Course 🚀</h1>

        <p className="text-muted">Browse and enroll in available courses.</p>

        <p className="badge bg-primary">
          {searchResult.length} Course(s) Available
        </p>
      </div>

      {/* Search */}
      <div className="input-group shadow-sm mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search courses..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() => handleSearch(searchInput)}
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && searchResult.length === 0 && (
        <div className="alert alert-info text-center">No courses found.</div>
      )}

      {/* Courses */}
      <div className="row">
        {searchResult.map((course) => {
          const isEnrolled = course.students?.includes(currentUser._id);

          return (
            <div key={course._id} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h4 className="fw-bold">{course.title}</h4>

                  <p className="text-muted">{course.description}</p>

                  <hr />

                  <p>
                    <strong>Instructor:</strong> {course.instructor?.username}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{course.price}
                  </p>

                  <p>
                    <strong>Students:</strong> {course.students?.length}
                  </p>

                  <div className="mt-auto">
                    <button
                      disabled={isEnrolled}
                      className={`btn w-100 ${
                        isEnrolled ? "btn-secondary" : "btn-success"
                      }`}
                      onClick={() => handleEnroll(course._id)}
                    >
                      {isEnrolled ? "Already Enrolled" : "Enroll Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrollComponent;
