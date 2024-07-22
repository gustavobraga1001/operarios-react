import axios from "axios";
import { getUserLocalStorage } from "../util";
import { removeUserLocalStorage, setUserLocalStorage } from "./Util";

// const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "http://192.168.11.239:8080";
const apiUrl = "/api";

const Api = axios.create({
  baseURL: apiUrl,
});
export default Api;
Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401) {
//       removeUserLocalStorage();
//       console.log("caiu");
//       window.location.reload();
//     }
//   }
// );

// Api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const user = getUserLocalStorage();

//     if (error.response.status === 401 && !originalRequest._retry && user) {
//       originalRequest._retry = true;
//       try {
//         const response = await axios.post(`${apiUrl}/token`, {
//           token: user.refreshToken,
//         });

//         const newAccessToken = response.data.accessToken;
//         user.token = newAccessToken;
//         setUserLocalStorage(user);

//         Api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         return Api(originalRequest);
//       } catch (err) {
//         console.error('Refresh token expired', err);
//         removeUserLocalStorage();
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );
