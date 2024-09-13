import axios from "axios";

//replace this with your ip address
const axiosInstance = axios.create({
    baseURL: "http://XXX.XXX.XX.X:8084",
})

module.exports = axiosInstance;
