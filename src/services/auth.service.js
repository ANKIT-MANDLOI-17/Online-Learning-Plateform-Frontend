import axios from "axios";
const API_URL = `https://online-learning-plateform-backend-api.onrender.com/api/user`;

axios.defaults.withCredentials = true;

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");

    return axios.post(API_URL + "/logout");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();

export default authService;