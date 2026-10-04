import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3200/api",
  withCredentials: true, 
});

export default api;