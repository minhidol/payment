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

const handleGetInterestLoansById = async(id) => {
    try {
        return await axiosClient.get(`/interest-loans/get-loans-by-id?id=${id}`);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleUpdateInterest = async(data) => {
    try {
        return await axiosClient.post(`/interest-loans/update-interest`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleUpdatePayDebt = async(data) => {
    try {
        return await axiosClient.post(`/interest-loans/update-pay-debt`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleUpdatePayUpDebt = async(data) => {
    try {
        return await axiosClient.post(`/interest-loans/update-pay-up-debt`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

const handleUpdateLoansExtension = async(data) => {
    try {
        return await axiosClient.post(`/interest-loans/update-loans-extension`, data);
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export{
    handleCreateInterestLoans,
    handleFilterInterestLoans ,
    handleGetListInterestLoansByUsername,
    handleGetInterestLoansById,
    handleUpdateInterest,
    handleUpdatePayDebt,
    handleUpdatePayUpDebt,
    handleUpdateLoansExtension
}
 
