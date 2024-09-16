import axios from "axios";

//replace this with your ip address
const axiosInstance = axios.create({
    baseURL: "http://192.168.10.6:8084",
})

module.exports = axiosInstance;
