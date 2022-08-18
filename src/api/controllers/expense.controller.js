const expenseService = require('../services/expense.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');

const handleCreateExpense = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        await expenseService.createExpense(data);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListExpenseByUsername = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listExpense = await expenseService.getListExpenseByUsername(query);
        return res.json(rsSuccess(listExpense));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListExpenseFilter = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listExpense = await expenseService.getListExpenseFilter(query);
        return res.json(rsSuccess(listExpense));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreateExpense,
    handleGetListExpenseByUsername,
    handleGetListExpenseFilter
}