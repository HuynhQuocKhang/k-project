import axios from 'axios';

const baseURL = process.env.REACT_APP_IS_DEVELOPMENT === "true" ? 'https://localhost:32773/api/' : 'http://auth.hqkhang.io.vn/api/api/'
// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: baseURL, // Set your base URL here
    headers: {
        'Content-Type': 'application/json', // Default content type for requests
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
});

// GET request function
export const axiosGET = async (url: string, params = {}) => {
    try {
        const response = await axiosInstance.get(url, { params });
        return response?.data ?? null;
    } catch (error) {
        console.error('GET request error:', error);
        return null;
    }
};

// POST request function
export const axiosPOST = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.post(url, data);
        return  response?.data ?? null;
    } catch (error) {
        console.error('POST request error:', error);
        return null;
    }
};