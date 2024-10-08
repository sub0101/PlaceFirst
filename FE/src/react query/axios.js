import axios from "axios";
import { getAccessToken } from "../utils/auth/getUserInfo";
const BASE_URL = import.meta.env.VITE_BASE_URL


export const unAuthAxios = axios.create({
    baseURL:BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Set default headers for all requests
    },
    withCredentials: true
})

export const authAxios= axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json', // Set default headers for all requests
    },
    withCredentials: true
})

authAxios.interceptors.request.use(
    config => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
    response => response,
    async (error) => {
        const prev_req = error?.config;
        console.log("error occured")
        if (error?.response?.status == 404) {

        }
    }
)