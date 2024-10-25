import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const publicRoutes = ["/signup", "/login"];

    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    console.log(config.url);
    console.log(isPublicRoute);

    if (!isPublicRoute) {
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken === null || accessToken === undefined) {
        return Promise.reject(new Error("User not authenticated"));
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
