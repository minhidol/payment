import axiosClient from '/dist/js/api/index.js';

const handleGetMenuAction = async(data) => {
    try {
        return await axiosClient.get(`/menu-action/get-menu-action`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}



export{
    handleGetMenuAction

}
 
