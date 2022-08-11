const groupPermissionModel = require('../models/permission_group.model');
const constants = require('../../constants/constants');

const updateActionPermission = async(data) => {
    try {
        return await groupPermissionModel.findOneAndUpdate({
            name: data.name
        }, {
            action: data.action
        })
    } catch (error) {
        throw error;
    }
}

const findAll = async() => {
    try {
        return await groupPermissionModel.find().lean();
    } catch (error) {
        throw error;
    }
}

const findGroupPermissionByType = async(type) => {
    try {
        return await groupPermissionModel.findOne({
            type: type,
            is_delete:constants.NOT_DELETED
        });
    } catch (error) {
        throw error;
    }
}

const findGroupPermissionByName = async(name) => {
    try{
        return groupPermission = await groupPermissionModel.findOne({
            name: name,
            is_delete: constants.NOT_DELETED
        });
    }catch(err){
        throw err;
    }
}

const createAndUpdate = async(body) => {
    try{
        const checkGroupPermissionExist = await findGroupPermissionByName(body.name);
        if(checkGroupPermissionExist){
            await groupPermissionModel.findOneAndUpdate({
                name: body.name,
                is_delete: constants.NOT_DELETED
            },{
                menu: body.menu,
                action: body.action
            })
        }else
            await groupPermissionModel.create(body);
    }catch(err){
        throw err;
    }
}



module.exports = {
    createAndUpdate,
    findGroupPermissionByType,
    findAll,
    findGroupPermissionByName,
    updateActionPermission
};
