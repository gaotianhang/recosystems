import axios from 'axios';
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8686/api',
        timeout: 15000
    })
    //请求拦截
    instance.interceptors.request.use(config => {
        return config;
    }, err => {

    })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res;
    }, err => {

    })

    return instance(config);

}




