const interestLoansService = require('../services/interest_loans.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
var moment = require('moment');

const handleCreateInterestLoans = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        data.latest_interest_payment = data.create_date;
        await interestLoansService.create(data);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListInterestLoansByUsername = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listInterestLoans = await interestLoansService.getListInterestLoansByUsername(query);
        return res.json(rsSuccess(listInterestLoans));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetInterestLoansByIdUsername = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listInterestLoans = await interestLoansService.getInterestLoansByIdUsername(query);
        return res.json(rsSuccess(listInterestLoans));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleUpdateInterestPayment = async(req, res) => {
    try{
        const query = {...req.body};
        query.username = req.jwtDecode.username;
        const listInterestLoans = await interestLoansService.updateInterestPayment(query);
        if(listInterestLoans.error == 1)
            return res.json(rsError(201, listInterestLoans.message))
        return res.json(rsSuccess(listInterestLoans));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleUpdatePayOffDebt = async(req, res) => {
    try{
        const query = {...req.body};
        query.username = req.jwtDecode.username;
        const updateInterestLoans = await interestLoansService.updatePayOffDebt(query);
        if(updateInterestLoans.error == 1)
            return res.json(rsError(201, `Ngày trả gốc phải lớn hơn ngày trả lãi cuối cùng: ${updateInterestLoans.checkDate}`));
        return res.json(rsSuccess(updateInterestLoans));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

// const handleGetListExpenseFilter = async(req, res) => {
//     try{
//         const query = {...req.query};
//         query.username = req.jwtDecode.username;
//         const listExpense = await expenseService.getListExpenseFilter(query);
//         return res.json(rsSuccess(listExpense));
//     }catch(error){
//         console.log('error: ', error);
//         return res.json(rsError(201, constants.ERROR_API));
//     }
// }



module.exports = {
    handleCreateInterestLoans,
    handleGetListInterestLoansByUsername,
    handleGetInterestLoansByIdUsername,
    handleUpdateInterestPayment,
    handleUpdatePayOffDebt
    // handleGetListExpenseFilter
}