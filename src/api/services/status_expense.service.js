var statusExpenseModel = require('../models/status_expense.model');
var constants = require('../../constants/constants');
var moment = require('moment');

const getListStatusExpense = async(query) => {
    try{
        const listStatusExpense = await statusExpenseModel.find({
            is_delete: constants.NOT_DELETED
        }).select({
            name: 1,
            type: 1
        }).lean();
    
        return listStatusExpense;
    }catch(error){
        throw error;
    }
}

const createStatusExpense = async(data) => {
    try{
        return await statusExpenseModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createStatusExpense,
    getListStatusExpense
}