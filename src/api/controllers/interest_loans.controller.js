const interestLoansService = require('../services/interest_loans.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
var moment = require('moment');

const handleCreateInterestLoans = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        data.create_date = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        data.latest_interest_payment = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
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
    // handleGetListExpenseFilter
}