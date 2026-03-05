import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Important for cookies
});

const UseAxiosSecure = () => {
    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // If 401 and not already retried
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Try to refresh token
                        const response = await axios.post(
                            "http://localhost:3000/api/auth/refresh",
                            {},
                            { withCredentials: true }
                        );

                        const newAccessToken = response.data.accessToken;
                        localStorage.setItem("accessToken", newAccessToken);

                        // Retry original request with new token
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axiosSecure(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed, logout user
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return axiosSecure;
};

export default UseAxiosSecure;