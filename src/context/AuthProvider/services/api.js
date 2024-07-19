import axios from "axios";
import { getUserLocalStorage } from "../util";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "https://192.168.11.239:8080";
// const apiUrl = "/api";

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
