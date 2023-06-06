import axios from "axios";

const instanse = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:5000",
});
// @ts-ignore
instanse.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = window.localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instanse;
