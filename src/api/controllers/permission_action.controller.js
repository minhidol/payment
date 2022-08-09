const permissionActionService = require('../services/permission_action.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');


const handleCreateAndUpdatePermissionAction = async(req, res) => {
    try {
        // them user created, updated
        const body = {...req.body};
        body.create_by = req.jwtDecode.username;
        console.log('user: ', body);
        await permissionActionService.createAndUpdateGroupDetail(body);
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}



module.exports = {
    handleCreateAndUpdatePermissionAction
}