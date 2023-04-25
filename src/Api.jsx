import axios from 'axios';
import config from './env';

const api = axios.create({
    // baseURL: "https://managerapiloja.azurewebsites.net/api"
    // Localhost IIS Express  //baseURL: 'https://localhost:44384/api'
    // Localhost Maquina
    //baseURL: 'http://10.1.1.5:5000/api'  //baseURL: 'http://192.168.0.4:5000/api'
    baseURL: config.url.API_URL  //baseURL: 'http://localhost:5000/api'
    // Server Debian Local
    //baseURL: 'https://192.168.25.100:5001/api'  //baseURL: 'http://192.168.25.100:5000/api'
    // Server Azure
    //baseURL: 'https://api.linesturdigital.com/api'});
})

api.defaults.timeout = 10 * 60 * 1000;
export default api;