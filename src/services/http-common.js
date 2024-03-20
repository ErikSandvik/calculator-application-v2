import axios from 'axios';
import router from '../router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api/',
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            alert('Expired or invalid session token. Please log in again.');
            // Clear the token from local storage
            localStorage.removeItem('token');
            // Redirect to login using the name of the login route
            router.push({ name: 'home' });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
