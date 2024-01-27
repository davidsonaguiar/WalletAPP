import axios from "axios";

const URL_BASE = import.meta.env.VITE_REACT_APP_API_URL;

const api = axios.create({
  baseURL: URL_BASE,
  withCredentials: true,
});

export default api;