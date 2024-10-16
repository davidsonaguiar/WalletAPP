import axios from "axios";

const URL_BASE = import.meta.env.VITE_REACT_APP_API_URL;

axios.defaults.method = "*";
axios.interceptors.request.use((config) => {
    config.baseURL = URL_BASE;
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    return config;
})

export { axios };
