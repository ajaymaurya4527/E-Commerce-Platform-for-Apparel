import axios from "axios";

const backendUrl = "http://localhost:8000/api/v1";

const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true
});



// REQUEST INTERCEPTOR
// token automatically bhejega

api.interceptors.request.use(

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



// RESPONSE INTERCEPTOR
// token expire -> auto logout

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (
            error.response?.status === 401 ||
            error.response?.status === 403
        ) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
export default api;