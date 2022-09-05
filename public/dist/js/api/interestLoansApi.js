import axiosClient from '/dist/js/api/index.js';

const handleCreateInterestLoans = async(data) => {
    try {
        return await axiosClient.post(`/interest-loans/create`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleGetListInterestLoansByUsername = async(query) => {
    try {
        return await axiosClient.get(`/interest-loans/get-loans?page=${query.page}&perPage=${query.perPage}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
const handleFilterInterestLoans = async(query) => {
    try {
        return await axiosClient.get(`/interest-loans/filter?page=${query.page}&perPage=${query.perPage}&from_date=${query.from_date}&to_date=${query.to_date}&type=${query.type}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateInterestLoans,
    handleFilterInterestLoans ,
    handleGetListInterestLoansByUsername
}
 
