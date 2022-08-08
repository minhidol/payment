
import {baseURL} from '/dist/js/constants.js';
function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
    'content-type': 'application/json',
    },
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = getCookie('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        //console.log('response: ', response)
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;