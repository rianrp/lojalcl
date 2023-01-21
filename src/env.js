const prod = {
    url: {
        API_URL: window.location.href.includes('192.168.0.100') ? 'http://192.168.0.100:5000/api' : 'https://api.linesturdigital.com/api',
    }
};
const dev = {
    url: {
        API_URL: window.location.href.includes('localhost') ? 'http://localhost:5000/api' : window.location.origin.replace(':3000', ':5000') + '/api'
    }
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

// const config = {
//     url: {
//         API_URL: 'http://26.227.80.146:5000/api',
//         // API_URL: 'http://192.168.15.100:443/api',
//     }
// };

export default config;