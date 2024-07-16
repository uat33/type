import axios from "axios";
const url = import.meta.env.VITE_APP_URL;
import { jwtDecode } from "jwt-decode";
const api = axios.create({
    baseURL: url,
    timeout: 10000, // 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

const setupInterceptors = () => {
    api.interceptors.request.use(
        async function (config) {
            // Retrieve context values
            const token = localStorage.getItem("token");
            if (token) {
                // Decode token to check expiration
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Check if token is expired or about to expire within 5 minutes
                if (decodedToken.exp - currentTime <= 300) {
                    // Token is about to expire or expired, refresh token
                    const id = localStorage.getItem("id");
                    const userResponse = await axios.get(`${url}/users/${id}`);
                    const user = userResponse.data.user;
                    const response = await axios.get(
                        `${url}/auth/refresh-token`,
                        {
                            user,
                        }
                    );
                    console.log(response);
                    const newToken = response.data.token;
                    localStorage.setItem("token", newToken);

                    // Get the new token from local storage
                    // Update authorization header with new token
                    config.headers.Authorization = `Bearer ${newToken}`;
                } else {
                    // Token is still valid, set Authorization header
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
};

// Initialize interceptor setup
setupInterceptors();
export default api;
