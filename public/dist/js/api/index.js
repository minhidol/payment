
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

});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    $('#pleaseWaitDialog').modal();
    const token = getCookie('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        console.log('response: ', response.data);
        const errorCode = response.data.ErrorCode;
      
        $('#pleaseWaitDialog').modal('hide');
        if(errorCode == 406){
            console.log('not permission')
            toastr.error('Bạn không có quyền thực hiện chức năng này!');
            
            return;
        }
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;