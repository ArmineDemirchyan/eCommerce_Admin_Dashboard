import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.accessToken

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const instance = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/login";
    }
  }
);
