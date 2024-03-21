import axiosInstance from './http-common';

const API_URL = 'calculator/';

export default {
    calculate(operation, number1, number2) {
        const token = sessionStorage.getItem('token');
        // Axios instance already configured with baseURL
        return axiosInstance.post(`${API_URL}calculate`, {
            operation,
            number1,
            number2
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};
