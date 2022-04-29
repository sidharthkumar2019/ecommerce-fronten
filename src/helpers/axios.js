import axios from "axios";
import {api} from '../urlConfig';
import store from '../store/index';

const axiosInstance = axios.create({
    baseURL: api
});

axiosInstance.interceptors.request.use((req) => {
    const {auth} = store.getState();
    if (auth.authenticate)
        req.headers.Authorization = `Bearer ${auth.token}`;
    return req;
})

export default axiosInstance;