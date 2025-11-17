import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001", // Puerto del backend
});

export default api;
