
import {baseURL} from '/dist/js/constants.js';



const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
    'content-type': 'application/json',
    },
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = document.cookie.token;
    console.log('token: ', token);
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