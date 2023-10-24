import axios from "axios";

const URL_BASE = import.meta.env.VITE_REACT_APP_API_URL;

const api = axios.create({
  baseURL: URL_BASE,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

api.interceptors.response.use(
  config => config,
  error => {
    alert(error.response.data);
    return error;
  }
)

export default api;