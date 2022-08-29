import axiosClient from '/dist/js/api/index.js';

const handleCreateRevenue = async(data) => {
    try {
        return await axiosClient.post(`/revenue/create`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleGetListRevenue = async(query) => {
    try {
        return await axiosClient.get(`/revenue/get-revenue?page=${query.page}&perPage=${query.perPage}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleFilterRevenue = async(query) => {
    try {
        return await axiosClient.get(`/revenue/filter?page=${query.page}&perPage=${query.perPage}&from_date=${query.from_date}&to_date=${query.to_date}&type=${query.type}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateRevenue,
    handleGetListRevenue,
    handleFilterRevenue
}
 
