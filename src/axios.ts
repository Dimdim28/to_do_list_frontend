import axios from "axios";

const instanse = axios.create({
    baseURL: "http://localhost:5000"
})

export default instanse;