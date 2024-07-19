import axios from "axios";
import { getUserLocalStorage } from "../util";

const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "/api";

export const Api = axios.create({
  baseURL: apiUrl,
});
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
