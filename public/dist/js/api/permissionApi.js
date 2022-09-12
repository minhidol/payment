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

const handleUpdateMenuAction = async(data) => {
    try {
        return await axiosClient.post(`/permission/update`, data);
    } catch (error) {
        return null;
    }
}

const handleGetPermission = async(type) => {
    try {
      
        return await axiosClient.get(`/permission/get?type=${type}`);
    } catch (error) {
        return null;
    }
}

export{
    handleGetListFeature,
    handleUpdateListFeature,
    handleUpdateMenuAction,
    handleGetPermission
}
 
