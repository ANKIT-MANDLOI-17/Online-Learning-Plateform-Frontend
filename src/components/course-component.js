import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser }) => {
  const history = useHistory();

  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        let response;

        if (currentUser.role === "instructor") {
          response = await CourseService.getInstructorCourses(currentUser._id);
        } else if (currentUser.role === "student") {
          response = await CourseService.getEnrolledCourses(currentUser._id);
        }

        setCourseData(response?.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container py-5">
        <div className="card shadow border-0 text-center p-5">
          <h2>🔒 Login Required</h2>

          <p className="text-muted">Please login to view your courses.</p>

          <button
            className="btn btn-primary"
            onClick={() => history.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          {currentUser.role === "instructor"
            ? "👨‍🏫 My Created Courses"
            : "🎓 My Enrolled Courses"}
        </h1>

        <p className="text-muted">Manage and explore your learning journey.</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && courseData.length === 0 && (
        <div className="alert alert-info text-center">No courses found.</div>
      )}

      {/* Course List */}
      <div className="row">
        {courseData.map((course) => (
          <div key={course._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title fw-bold">{course.title}</h4>

                <p className="text-muted">{course.description}</p>

                <hr />

                <p>
                  <strong>Students:</strong> {course.students.length}
                </p>

                <p>
                  <strong>Instructor:</strong>{" "}
                  {course.instructor?.username || "N/A"}
                </p>

                <button className="btn btn-success w-100">
                  ₹{course.price}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseComponent;
