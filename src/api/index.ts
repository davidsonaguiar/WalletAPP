import axios from "axios";

const URL_BASE = import.meta.env.VITE_REACT_APP_API_URL;
console.log(URL_BASE)

const api = axios.create({
  baseURL: URL_BASE,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})


export default api;