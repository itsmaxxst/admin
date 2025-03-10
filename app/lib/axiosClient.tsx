import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: '/api',
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axios.get('/api/auth');
                Cookies.set('accessToken', data.accessToken, { secure: true, sameSite: 'Strict' });
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(originalRequest);
            } catch (err) {
                Cookies.remove('accessToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosClient;
