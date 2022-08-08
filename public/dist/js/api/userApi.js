import axiosClient from '/dist/js/api/index.js';


const handleApiLogin = async(data) => {
    try {
        return await axiosClient.post('http://localhost:3000/api/user/login', data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleApiLogin
}
 
