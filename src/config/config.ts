import axios from "axios";

const baseURL = "http://192.168.1.12:3000";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});
