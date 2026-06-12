import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";

import AuthService from "./services/auth.service";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="container py-4">
        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>

          <Route exact path="/register">
            {!currentUser ? <RegisterComponent /> : <Redirect to="/profile" />}
          </Route>

          <Route exact path="/login">
            {!currentUser ? (
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>

          <Route exact path="/profile">
            {currentUser ? (
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/course">
            {currentUser ? (
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/postCourse">
            {currentUser?.role === "instructor" ? (
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <Redirect to="/course" />
            )}
          </Route>

          <Route exact path="/enroll">
            {currentUser?.role === "student" ? (
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <Redirect to="/course" />
            )}
          </Route>

          <Route>
            <div className="text-center mt-5">
              <h1 className="display-4">404</h1>
              <p className="lead">Page Not Found</p>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
