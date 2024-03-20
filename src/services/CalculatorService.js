import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/calculator/';

// Create an Axios instance to use for the calculator API
const calculatorApi = axios.create({
    baseURL: API_BASE_URL
});

// Add a request interceptor to the Axios instance
calculatorApi.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});

export default {
    calculate(number1, number2, operation) {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Ensure the token is set in the Authorization header for this request
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Use the Axios instance with the interceptor to make the request
        return calculatorApi.post('/calculate', {
            number1,
            number2,
            operation
        }, { headers });
    }
};
