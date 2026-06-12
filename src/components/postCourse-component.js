import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = ({ currentUser }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const postCourse = async () => {
    setMessage("");

    if (!title.trim() || !description.trim() || !price) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await CourseService.post(title, description, Number(price));

      alert("🎉 Course created successfully!");

      history.push("/course");
    } catch (error) {
      setMessage(error?.response?.data || "Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (currentUser.role !== "instructor") {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Access Denied</h3>

          <p>Only instructors can create courses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Form */}
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4">Create New Course 🚀</h2>

              {message && <div className="alert alert-danger">{message}</div>}

              <div className="mb-3">
                <label className="form-label">Course Title</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="React Masterclass"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>

                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Describe your course..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Price (₹)</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="999"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <button
                onClick={postCourse}
                disabled={loading}
                className="btn btn-primary btn-lg w-100"
              >
                {loading ? "Publishing..." : "Publish Course"}
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Live Preview</h4>

              <div className="card border">
                <div className="card-body">
                  <h5>{title || "Course Title"}</h5>

                  <p className="text-muted">
                    {description || "Course description will appear here."}
                  </p>

                  <hr />

                  <h6 className="text-success">₹ {price || "0"}</h6>

                  <small className="text-muted">
                    Instructor: {currentUser.username}
                  </small>
                </div>
              </div>

              <div className="mt-4">
                <div className="alert alert-info">
                  💡 Tip: Write a clear title and detailed description to
                  attract more students.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCourseComponent;
