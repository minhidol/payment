const revenueExpenseService = require('../services/revenue_expense.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');

const handleCreateRevenueExpense = async(req, res) => {
    try {
        await revenueExpenseService.createRevenueExpense(req.body);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}




module.exports = {
    handleCreateRevenueExpense 
}