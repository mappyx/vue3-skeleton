import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../services/token.service";

const ApiService = {
    _requestInterceptor: 0,
    _401interceptor: 0,
    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },
    setHeader() {
        const token: any = TokenService.getToken();
        if (token === null) return;
        axios.defaults.headers.common["access-token"] = token.access_token;
        axios.defaults.headers.common["Accept"] = "application/json";
    },
    removeHeader() {
        axios.defaults.headers.common = {};
    },
    get(resource: string) {
        return axios.get(resource);
    },
    post(resource: string, data: any) {
        return axios.post(resource, data);
    },
    put(resource: string, data: any) {
        return axios.put(resource, data);
    },
    delete(resource: string) {
        return axios.delete(resource);
    },
    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },
    mountRequestInterceptor() {
        this._requestInterceptor = axios.interceptors.request.use(async config => {
            return config;
        });
    },
    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            async response => {
                return response;
            },
            async error => {
                if (error.request.status === 401) {
                    throw error;
                }
                throw error;
            }
        );
    },
    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    }
}

export default ApiService;