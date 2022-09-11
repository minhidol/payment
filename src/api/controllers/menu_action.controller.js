const menuActionService = require('../services/menu_action.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');

const handleCreateMenuAction = async(req, res) => {
    try {
        // them user created, updated
        await menuActionService.create(req.body);
        return res.json(rsSuccess(null));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetAll = async(req, res) => {
    try {
        const listMenuAction = await menuActionService.findAll();
        return res.json(rsSuccess(listMenuAction));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetMenuActionArr = async(req, res) => {
    try {
        const listMenuAction = await menuActionService.arrangementMenuAction();
        return res.json(rsSuccess(listMenuAction));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreateMenuAction,
    handleGetAll,
    handleGetMenuActionArr
}