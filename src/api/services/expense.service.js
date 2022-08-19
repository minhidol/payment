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
        const arrDate = query.date_search.split(',');
        const from_date = moment(new Date(arrDate[0])).format("DD/MM/YYYY");
        const to_date = moment(new Date(arrDate[1])).add(1, 'days').format("DD/MM/YYYY");
        console.log('arr date: ', {from_date, to_date});
        const queryFilter = {
            create_by: query.username,
            create_date: {
               $gte: from_date,
            },
             create_date: {
               $lte: to_date,
            },
            is_delete: constants.NOT_DELETED
        };
        if(query.type != ''){
            queryFilter.type = query.type;
        }
        const listExpense = await expenseModel.paginate(queryFilter,{
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