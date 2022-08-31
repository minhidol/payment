var statusModel = require('../models/status.model');
var constants = require('../../constants/constants');
var moment = require('moment');

const getListStatusInterestLoans = async(query) => {
    try{
        const listStatusInterestLoans = await statusModel.find({
            is_delete: constants.NOT_DELETED,
            type_status: 'insterest_loans'
        }).select({
            name: 1,
            type: 1
        }).lean();
    
        return listStatusInterestLoans;
    }catch(error){
        throw error;
    }
}

const createStatus = async(data) => {
    try{
        return await statusModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    createStatus,
    getListStatusInterestLoans
}