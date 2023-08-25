import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Set your API base URL
  timeout: 5000, // Set a timeout
});

const api = {
  loginUser: async (email, password) => {
    const response = await instance.post("/login", {
      email,
      password,
    });
    return response;
  },
  // Add other API functions here if needed
};

export default api;
