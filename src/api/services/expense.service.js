var expenseModel = require('../models/expense.model');
var constants = require('../../constants/constants');
var moment = require('moment');

const getListExpenseByUsername = async(query) => {
    try{
        const listExpense = await expenseModel.paginate({
            create_by: query.username,
            is_delete: constants.NOT_DELETED
        },{
            page: query.page,
            perPage: query.perPage,
            lean: true,
            sort: { create_date: -1 }
        });
        const result = {
            page: listExpense.page,
            pages: listExpense.pages,
            total: listExpense.documents,
            data: listExpense.data,
        }
        return result;
    }catch(error){
        throw error;
    }
}

const getListExpenseFilter = async(query) => {
    try{
        console.log('query: ', query);
        const listExpense = await expenseModel.paginate({
            create_by: query.username,
            type: query.type,
            create_date: {
               $gte: query.from_date,
            },
             create_date: {
               $lte: query.to_date,
            },
            is_delete: constants.NOT_DELETED
        },{
            page: query.page,
            perPage: query.perPage,
            lean: true,
            sort: { create_date: -1 }
        });
        const result = {
            page: listExpense.page,
            pages: listExpense.pages,
            total: listExpense.documents,
            data: listExpense.data,
        }
        return result;
    }catch(error){
        throw error;
    }
}

const createExpense = async(data) => {
    try{
        return await expenseModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createExpense,
    getListExpenseByUsername,
    getListExpenseFilter
}