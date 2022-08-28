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
        return await axiosClient.get(`/expense/filter?page=${query.page}&perPage=${query.perPage}&from_date=${query.from_date}&to_date=${query.to_date}&type=${query.type}`);
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
 