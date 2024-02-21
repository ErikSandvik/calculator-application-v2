import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/calculator/';

export default {
    calculate(operation, number1, number2) {
        return axios.post(`${API_BASE_URL}calculate`, {
            operation,
            number1,
            number2
        });
    }
};
