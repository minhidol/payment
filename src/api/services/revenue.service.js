var revenueModel = require('../models/revenue.model');
var constants = require('../../constants/constants');
var moment = require('moment');

const getListRevenueByUsername = async(query) => {
    try{
        const listRevenue = await revenueModel.paginate({
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

const getListRevenueFilter = async(query) => {
    try{
        
        const queryFilter = {
            create_by: query.username,
            create_date: {
               $gte: query.from_date,
               $lte: query.to_date+1,
            },
            is_delete: constants.NOT_DELETED
        };
        if(query.type != ''){
            queryFilter.type = query.type;
        }
        console.log('query: ', query);
        const listRevenue = await revenueModel.paginate(queryFilter,{
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

const createRevenue = async(data) => {
    try{
        return await revenueModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createRevenue,
    getListRevenueByUsername,
    getListRevenueFilter
}