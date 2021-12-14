import axios from "axios";
// export const API_URL = `https://mongoklevzhits.herokuapp.com/`
export const API_URL = `http://localhost:5000/`

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    // config.headers.Authorization= `Bearer ${localStorage.getItem('token')}`;
    config.headers.Authorization= `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWE0NDBlMDlmMmMzMDFkOGI5YjI2MyIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTYzNzUyMTgzOSwiZXhwIjoxNjM3NjA4MjM5fQ.JxYPxigfobyELl_6LA-CzBjbnF3Psmz4nByo79yYTCM`;
    return config;
})

export default instance