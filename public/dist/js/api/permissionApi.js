import axiosClient from '/dist/js/api/index.js';

const handleGetListFeature = async(name) => {
    try {
        return await axiosClient.get(`/permission-action/get-list-feature?name=${name}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleUpdateListFeature = async(data) => {
    try {
        return await axiosClient.post(`/permission-group/update-action`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleGetListFeature,
    handleUpdateListFeature
}
 
