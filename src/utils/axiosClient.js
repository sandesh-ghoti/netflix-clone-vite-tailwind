import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "./store";
import { setLoading, showToast } from "./appConfigSlice";
export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";
import { BASE_URL, TMDB_ACCESS_TOKEN } from "../constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = TMDB_ACCESS_TOKEN;
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});
axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false));
    if (response.status === 200) {
      return response;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(showToast({ type: TOAST_FAILURE, message: error }));

    // if access token expired then refresh access token
    if (statusCode === 401) {
      removeItem(KEY_ACCESS_TOKEN);
      const response = await axios.create().get(`${BASE_URL}/auth/refresh`);
      if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;
        return axios(originalRequest);
      } else {
        // error at response send him to login page
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(showToast({ type: TOAST_FAILURE, message: error.message }));
    return Promise.reject(error);
  }
);
export default axiosClient;
