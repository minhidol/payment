const permissionGroupService = require('../services/permission_group.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
const permissionGroupCreated = require('../joi/permission_group/permissionGroupCreated');


const handleUpdateActionPermission = async(req, res) => {
    try {
        // them user created, updated
        await permissionGroupService.updateActionPermission(req.body);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleCreatePermissionGroup = async(req, res) => {
    try {
        // them user created, updated
        console.log('req: ', req.jwtDecode)
        const validate = permissionGroupCreated.validate(req.body);
        if(validate.error)
            return res.json(rsError(202, constants.ERROR_BODY_REQUEST));
        await permissionGroupService.createAndUpdate(req.body);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreatePermissionGroup,
    handleUpdateActionPermission
}