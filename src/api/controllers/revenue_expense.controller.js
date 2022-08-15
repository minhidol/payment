const revenueExpenseService = require('../services/revenue_expense.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');

const handleCreateRevenueExpense = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        await revenueExpenseService.createRevenueExpense(data);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListRevenueExpenseByUsername = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listRevenue = await revenueExpenseService.getListRevenueExpenseByUsername(query);
        return res.json(rsSuccess(listRevenue));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreateRevenueExpense,
    handleGetListRevenueExpenseByUsername
}