const menuActionModel = require('../models/menu_action.model');
const constants = require('../../constants/constants');

const create = async(data) => {
    try {
        return await menuActionModel.create(data);
    } catch (error) {
        throw error;
    }
}

const findAll = async() => {
    try {
        return await menuActionModel.find().lean();
    } catch (error) {
        throw error;
    }
}


const getSubMenuActionByIdMenu = async(id) => {
    try {
        const listSubMenu = await menuActionModel.find({
            parent_menu: id,
            is_delete: constants.NOT_DELETED
        }).select({
            create_date: 0,
            create_by: 0,
            update_date: 0,
            update_by: 0,
            parent: 0,
            __v: 0,
            is_delete: 0
        });
        return listSubMenu;
    } catch (error) {
        throw error;
    }
}

const getSubMenuActionByIdType = async(id) => {
    try {
        const listSubMenu = await menuActionModel.find({
            parent: id,
            is_delete: constants.NOT_DELETED
        });
        return listSubMenu;
    } catch (error) {
        throw error;
    }
}

const arrangementMenuAction = async() => {
    try {
        const menuAction = await menuActionModel.find({
            type: 'menu',
            is_delete: constants.NOT_DELETED
        }).lean().select({
            create_date: 0,
            create_by: 0,
            update_date: 0,
            update_by: 0,
            parent: 0,
            __v: 0,
            is_delete: 0
        });;
        for(let i = 0; i < menuAction.length; i++){
            const listSubMenu = await getSubMenuActionByIdMenu(menuAction[i].id);
            menuAction[i].list_sub_menu = listSubMenu;
        }

        //console.log('menu action: ', menuAction);
        return menuAction;
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
    arrangementMenuAction
};
