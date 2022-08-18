import axiosClient from '/dist/js/api/index.js';

const handleCreateExpense = async(data) => {
    try {
        return await axiosClient.post(`/expense/create`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleGetListExpense = async(query) => {
    try {
        return await axiosClient.get(`/expense/get-expense?page=${query.page}&perPage=${query.perPage}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleFilterExpense = async(query) => {
    try {
        return await axiosClient.get(`/expense/filter?page=${query.page}&perPage=${query.perPage}&date_search=${query.dateSearch}&type=${query.type}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateExpense,
    handleGetListExpense,
    handleFilterExpense
}
 
