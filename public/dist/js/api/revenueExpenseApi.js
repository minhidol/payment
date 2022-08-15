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
        return await axiosClient.get(`/revenue-expense/get-revenue-expense?page=${query.page}&pageNum=${query.pageNum}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateRevenueExpense,
    handleGetListRevenueExpense
}
 
