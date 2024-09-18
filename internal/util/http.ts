import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8080",
});

http.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken === null || accessToken === undefined) {
      return Promise.reject(new Error("User not authenticated"));
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
