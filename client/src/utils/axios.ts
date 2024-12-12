import { AccessToken } from "@/types";
import { envConfig } from "@/config";
import axios from "axios";
import fetchData from "@/lib/api";
const { apiUrl, bearer } = envConfig;

const api = axios.create({ baseURL: apiUrl });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await fetchData<AccessToken>({
          endpoint: "refresh",
          feature: "auth",
          method: "GET",
        });

        const { accessToken } = res.data;
        api.defaults.headers[bearer] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
