import axios from 'axios';
import config from './env';

const api = axios.create({
    baseURL: "https://managerapiloja.azurewebsites.net/"
})

api.defaults.timeout = 10 * 60 * 1000;
export default api;
