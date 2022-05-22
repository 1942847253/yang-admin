import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import router from "src/router/index";
import { useLocalStorage } from "../hooks/useLocalStorage";


const { getLocalStorage } = useLocalStorage();

/**
 * @description  本套配置只适用于jwtoken 额外操作请自行配置
 */
const Fetch = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "/web/api",
});

//过滤器
Fetch.interceptors.request.use(function (config: AxiosRequestConfig) {
    if (localStorage.token) {
        config.headers!.Authorization = "Bearer " + getLocalStorage("token");
    }
    return config;
}),
    function (err: Error) {
        return Promise.reject(err);
    };

//请求拦截器
Fetch.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data;
    },
    (err: any) => {
        if (err.response.data) {
            ElMessage({
                showClose: true,
                message: err.response.data,
                type: "error",
            });
            if (err.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("uid");
                router.replace("/login");
            }
        }

        return Promise.reject(err);
    }
);

export default Fetch;
