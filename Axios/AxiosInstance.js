import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://XXX.XXX.XX.X:8084",
})

module.exports = axiosInstance;
