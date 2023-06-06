import axios from "axios";

const base = process.env.REACT_APP_API_BASE;

console.log(base);

const instanse = axios.create({
  baseURL: "https://to-do-list-back.herokuapp.com",
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
