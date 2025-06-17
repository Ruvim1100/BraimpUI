import axios from "axios";
import { getUser } from "../auth/authService";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

axiosPrivate.interceptors.request.use(
  async config => {
    const user = await getUser();
    if (user && user.access_token) {
      config.headers!["Authorization"] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);
