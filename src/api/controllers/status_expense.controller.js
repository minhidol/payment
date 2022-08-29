const statusExpenseService = require('../services/status_expense.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
var moment = require('moment');

const handleCreateStatusExpense = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        data.create_date = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
        await statusExpenseService.createStatusExpense(data);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

// const handleGetListExpenseByUsername = async(req, res) => {
//     try{
//         const query = {...req.query};
//         query.username = req.jwtDecode.username;
//         const listExpense = await expenseService.getListExpenseByUsername(query);
//         return res.json(rsSuccess(listExpense));
//     }catch(error){
//         console.log('error: ', error);
//         return res.json(rsError(201, constants.ERROR_API));
//     }
// }

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
    handleCreateStatusExpense
}