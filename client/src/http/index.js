import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(config => config, async err => {
    const originalRequest = err.config;
    if(err.response.status == 401 && !originalRequest._isRetry && err.config){
        originalRequest._isRetry = true;
        try{
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true,});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }catch(e){
            console.log('пользователь не авторизован');
        }
    }

});

export default $api;