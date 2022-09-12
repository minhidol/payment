const permissionService = require('../services/permission.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');



const handleCreatePermission = async(req, res) => {
    try {
        // them user created, updated
        await permissionService.create(req.body);
        return res.json(rsSuccess(null));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetAll = async(req, res) => {
    try {
        // them user created, updated
        const listPermission = await permissionService.findAll();
        return res.json(rsSuccess(listPermission));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleUpdate = async(req, res) => {
    try {
        // them user created, updated
        const listPermission = await permissionService.updateMenuAction(req.body);
        return res.json(rsSuccess(listPermission));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleGetPermission = async(req, res) => {
    try {
        console.log('body: ', req.query)
        // them user created, updated
        const listPermission = await permissionService.getPermissionByType(req.query);
        return res.json(rsSuccess(listPermission));
    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

module.exports = {
    handleCreatePermission,
    handleGetAll,
    handleUpdate,
    handleGetPermission
}