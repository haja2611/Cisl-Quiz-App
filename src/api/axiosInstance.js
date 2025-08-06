import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Your backend URL
  withCredentials: true, // ✅ For cookies/session support
});

export default axiosInstance;
