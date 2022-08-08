const userService = require('../services/user.service');
const constants = require('../../constants/constants');
const {rsError, rsSuccess} = require('../helpers/response');
const userRegisterJoi = require('../joi/user/userRegister');

const handleGetListStaff = async(req, res) => {
    try {
        const listStaff = await userService.getListStaff();
        return res.json(rsSuccess(listStaff));
    } catch (error) {
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleRegister = async(req, res) => {
    try {
        const validate = userRegisterJoi.validate(req.body);
        if(validate.error)
            return res.json(rsError(202, constants.ERROR_BODY_REQUEST));
        const userCreated = await userService.register(req.body);
        if(userCreated == constants.STATUS_ERROR)
            return res.json(rsError(400, constants.USERNAME_EXIST));
        return res.json(rsSuccess(null));

    } catch (error) {
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

const handleLogin = async(req, res) => {
    try{
        const checkLogin = await userService.login(req.body);
        if(checkLogin == constants.STATUS_ERROR)
            return res.json(rsError(401, constants.USERNAME_NOT_EXIST));
        if(checkLogin == constants.PASSWORD_NOT_VALID)
            return res.json(rsError(401, constants.MESSAGE_PASSWORD_NOT_VALID))
        return res.json(rsSuccess(checkLogin));
    }catch(error){
        console.log('error: ', error);
        return res.json(rsError(201, constants.ERROR_API));
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleGetListStaff
}