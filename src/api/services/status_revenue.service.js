var statusRevenueModel = require('../models/status_revenue.model');
var constants = require('../../constants/constants');
var moment = require('moment');

const getListStatusRevenue = async(query) => {
    try{
        const listStatusRevenue = await statusRevenueModel.find({
            is_delete: constants.NOT_DELETED
        }).select({
            name: 1,
            type: 1
        }).lean();
    
        return listStatusRevenue;
    }catch(error){
        throw error;
    }
}

const createStatusRevenue = async(data) => {
    try{
        return await statusRevenueModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createStatusRevenue,
    getListStatusRevenue
}