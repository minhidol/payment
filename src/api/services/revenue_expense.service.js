var revenueExpenseModel = require('../models/revenue_expense.model');
var constants = require('../../constants/constants');

const getListRevenueExpenseByUsername = async(query) => {
    try{
        const listRevenue = await revenueExpenseModel.paginate({
            create_by: query.username,
            is_delete: constants.NOT_DELETED
        },{
            page: query.page,
            perPage: query.perPage,
            lean: true,
            sort: { create_date: -1 }
        });
        const result = {
            page: listRevenue.page,
            pages: listRevenue.pages,
            total: listRevenue.documents,
            data: listRevenue.data,
        }
        return result;
    }catch(error){
        throw error;
    }
}

const createRevenueExpense = async(data) => {
    try{
        return await revenueExpenseModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createRevenueExpense,
    getListRevenueExpenseByUsername
}