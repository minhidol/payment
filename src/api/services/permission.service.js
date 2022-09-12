const permissionModel = require('../models/permission.model');
const constants = require('../../constants/constants');

const create = async(data) => {
    try {
        return await permissionModel.create(data);
    } catch (error) {
        throw error;
    }
}

const findAll = async() => {
    try {
        return await permissionModel.find().lean();
    } catch (error) {
        throw error;
    }
}

const updateMenuAction = async(data) => {
    try {
        console.log('data: ', data)
        return await permissionModel.findOneAndUpdate({
            type: data.type,
            is_delete: constants.NOT_DELETED
        },{
            menu_action: data.menu_action
        });
    } catch (error) {
        throw error;
    }
}

const getPermissionByType = async(data) => {
    try {
        console.log('data: ', data)
        return await permissionModel.findOne({
            type: data.type,
            is_delete: constants.NOT_DELETED
        });
    } catch (error) {
        throw error;
    }
}


// const findAll = async() => {
//     try {
//         return await groupPermissionModel.find().lean();
//     } catch (error) {
//         throw error;
//     }
// }

// const findGroupPermissionByType = async(type) => {
//     try {
//         return await groupPermissionModel.findOne({
//             type: type,
//             is_delete:constants.NOT_DELETED
//         });
//     } catch (error) {
//         throw error;
//     }
// }



module.exports = {
    create,
    findAll,
    updateMenuAction,
    getPermissionByType
};
