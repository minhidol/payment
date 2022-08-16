var revenueExpenseModel = require('../models/revenue_expense.model');
var constants = require('../../constants/constants');
var moment = require('moment');

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

const getListRevenueExpenseFilter = async(query) => {
    try{
        console.log('query: ', query);
        const arrDate = query.date_search.split(',');
        const from_date = moment(new Date(arrDate[0])).format("DD/MM/YYYY");
        const to_date = moment(new Date(arrDate[1])).add(1, 'days').format("DD/MM/YYYY");
        console.log('arr date: ', {from_date, to_date});
        const listRevenue = await revenueExpenseModel.paginate({
            create_by: query.username,
            type: query.type,
            create_date: {
               $gte: from_date,
            },
             create_date: {
               $lte: to_date,
            },
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
    getListRevenueExpenseByUsername,
    getListRevenueExpenseFilter
}