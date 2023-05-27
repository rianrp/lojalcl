const prod = {
    url: {
        API_URL: window.location.href.includes('192.168.0.110') ? 'http://192.168.0.110:5214/api' : 'https://managerapiloja.azurewebsites.net/api',
    }
}; const dev = {
    url: {
        API_URL: window.location.href.includes('localhost') ? 'https://managerapilojadesenvolvimento.azurewebsites.net/api' : window.location.origin.replace(':3000', ':5000') + '/api'
    }
};
const config = process.env.NODE_ENV === 'development' ? dev : prod;
// const config = {
//     url: {//         API_URL: 'http://26.227.80.146:5000/api',
//     }// };
export default config;