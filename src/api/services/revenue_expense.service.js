var revenueExpenseModel = require('../models/revenue_expense.model');


const createRevenueExpense = async(data) => {
    try{
        return await revenueExpenseModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createRevenueExpense 
}