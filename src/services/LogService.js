import axiosInstance from './http-common';

const API_URL = 'calculator/history';

export default {
    getCalculationLog() {
        const token = sessionStorage.getItem('token');
        // Axios instance is already configured with baseURL
        return axiosInstance.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};
