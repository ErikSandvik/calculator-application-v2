import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/calculator/';

export default {
    calculate(operation, number1, number2) {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');

        // Include the token in the request headers
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        return axios.post(`${API_BASE_URL}calculate`, {
            operation,
            number1,
            number2
        }, { headers: headers });
    }
};
