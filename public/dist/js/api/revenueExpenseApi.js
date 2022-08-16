import axiosClient from '/dist/js/api/index.js';

const handleCreateRevenueExpense = async(data) => {
    try {
        return await axiosClient.post(`/revenue-expense/create`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleGetListRevenueExpense = async(query) => {
    try {
        return await axiosClient.get(`/revenue-expense/get-revenue-expense?page=${query.page}&perPage=${query.perPage}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleFilterRevenueExpense = async(query) => {
    try {
        return await axiosClient.get(`/revenue-expense/filter?page=${query.page}&perPage=${query.perPage}&date_search=${query.dateSearch}&type=${query.type}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateRevenueExpense,
    handleGetListRevenueExpense,
    handleFilterRevenueExpense
}
 
