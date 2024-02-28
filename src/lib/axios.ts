import { BASE_URL } from "@/utils/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL + "/api", // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = localStorage.getItem("token") ?? "";

    // If token is present add it to request's Authorization Header
    if (accessToken !== null) {
      config.headers.token = "Bearer " + accessToken;
      config.headers.authorization = "Bearer " + accessToken;
    }
    return config;
  },
  async (error) => {
    // Handle request errors here

    return await Promise.reject(error);
  }
);

export default axiosInstance;
