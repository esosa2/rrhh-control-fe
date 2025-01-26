import axios from "axios";

export default axios.create(
    {
        baseURL: 'http://localhost:8001/api', // Base URL
        responseType: 'json',
        timeout: 6000
    }
);