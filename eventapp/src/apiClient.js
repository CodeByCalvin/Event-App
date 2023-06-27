import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;

    // Set axios defaults
    axios.defaults.baseURL = API_URL;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          // If session is expired
          this.logoutHandler();
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  async login(username, password) {
    const response = await axios.post("/login", { username, password });
    const token = response.data.token;
    this.setAuthToken(token);
    return response.data;
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Remove the auth header for future requests
    this.setAuthToken(false);
    // Redirect to login page
    window.location.href = "/login";
  }

  async getEvents() {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async addEvent(event) {
    try {
      const response = await axios.post(`${API_URL}/events/post`, event);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateEvent(id, event) {
    try {
      const response = await axios.put(`${API_URL}/events/edit/${id}`, event);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEvent(id) {
    try {
      const response = await axios.delete(`${API_URL}/events/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
