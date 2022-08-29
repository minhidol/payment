const revenueService = require('../services/revenue.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
var moment = require('moment');

const handleCreateRevenue = async(req, res) => {
    try {
        const data = {...req.body};
        data.create_by = req.jwtDecode.username;
        data.create_date = moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
        await revenueService.createRevenue(data);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListRevenueByUsername = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listRevenue = await revenueService.getListRevenueByUsername(query);
        return res.json(rsSuccess(listRevenue));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetListRevenueFilter = async(req, res) => {
    try{
        const query = {...req.query};
        query.username = req.jwtDecode.username;
        const listRevenue = await revenueService.getListRevenueFilter(query);
        return res.json(rsSuccess(listRevenue));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreateRevenue,
    handleGetListRevenueByUsername,
    handleGetListRevenueFilter
}