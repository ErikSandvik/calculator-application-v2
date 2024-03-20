import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/auth/';

export default {
    login(username, password) {
        return axios.post(`${API_BASE_URL}login`, {
            username,
            password
        });
    },
    register(username, password) {
        return axios.post(`${API_BASE_URL}register`, {
            username,
            password
        });
    }
};
