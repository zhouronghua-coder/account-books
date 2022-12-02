import axios from "axios";
import { showToast } from "@/components/Toast";
import "vant/es/toast/style";
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return response.data;
    } else {
      showToast({
        type: "error",
        message: "出错啦",
      });
      return "出错了";
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
