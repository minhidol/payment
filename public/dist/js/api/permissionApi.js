import axiosClient from '/dist/js/api/index.js';

const handleGetListFeature = async() => {
    try {
        return await axiosClient.get(`/permission-action/get-list-feature`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}


export{
    handleGetListFeature,

}
 
