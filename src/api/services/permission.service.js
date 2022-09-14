const permissionModel = require('../models/permission.model');
const constants = require('../../constants/constants');
const menuActionService = require('./menu_action.service');

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

const getPermissionByTypeForLogin = async(data) => {
    try {
        console.log('data: ', data)
        const listPermission = await permissionModel.findOne({
            type: data.type,
            is_delete: constants.NOT_DELETED
        });
        const listMenu = listPermission.menu_action.list_menu;
        const listAction = listPermission.menu_action.list_action;
        const listLinkAction = [];
        for(let i = 0; i < listAction.length; i++){
            var action = await menuActionService.getSubMenuByIdType({
                id: listAction[i].id,
                type: 'action'
            });
            listLinkAction.push(action.link);
        }
            
        for(let i = 0; i < listMenu.length; i++){
            var menu = await menuActionService.getSubMenuByIdType({
                id: listMenu[i].id,
                type: 'menu',

            })
            listMenu[i].name = menu.name;
            listMenu[i].icon = menu.icon;
            listMenu[i].link = menu.link;
            var listSubMenu = listMenu[i].list_sub_menu;
            for(let j = 0; j < listSubMenu.length; j++){
                var subMenu = await menuActionService.getSubMenuByIdType({
                    id: listSubMenu[j].id,
                    type: 'sub_menu'
                })
                listSubMenu[j].name = subMenu.name;
                listSubMenu[j].link = subMenu.link;
            }
        }

        return {listMenu, listLinkAction};
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
    getPermissionByType,
    getPermissionByTypeForLogin
};
