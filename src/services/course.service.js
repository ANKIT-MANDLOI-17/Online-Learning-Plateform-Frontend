import axios from "axios";

const API_URL = "https://online-learning-plateform-backend-api.onrender.com/api/courses";

// Send cookies automatically
axios.defaults.withCredentials = true;

class CourseService {
  // Create Course
  post(title, description, price) {
    return axios.post(API_URL, {
      title,
      description,
      price,
    });
  }

  // Get instructor courses
  getInstructorCourses(instructorId) {
    return axios.get(`${API_URL}/instructor/${instructorId}`);
  }

  // Get enrolled courses
  getEnrolledCourses(studentId) {
    return axios.get(`${API_URL}/student/${studentId}`);
  }

  // Search course
  getCourseByName(name) {
    return axios.get(`${API_URL}/findByName/${name}`);
  }

  // Enroll
  enroll(courseId) {
    return axios.post(`${API_URL}/enroll/${courseId}`);
  }

  // Get single course
  getCourse(courseId) {
    return axios.get(`${API_URL}/${courseId}`);
  }

  // Update course
  updateCourse(courseId, data) {
    return axios.patch(`${API_URL}/${courseId}`, data);
  }

  // Delete course
  deleteCourse(courseId) {
    return axios.delete(`${API_URL}/${courseId}`);
  }

  // Get all courses
  getAllCourses() {
    return axios.get(API_URL);
  }
}

const courseService = new CourseService();

export default courseService;