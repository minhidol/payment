import axiosClient from '/dist/js/api/index.js';


const handleApiLogin = async(data) => {
    try {
        return await axiosClient.post('/account/login', data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleCreateUser = async(data) => {
    try {
        return await axiosClient.post('/account/register', data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleGetListUser = async(data) => {
    try {
        return await axiosClient.get('/account/get-list-staff', data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleApiLogin,
    handleCreateUser,
    handleGetListUser
}
 
