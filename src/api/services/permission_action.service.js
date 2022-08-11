var permissionActionModel = require('../models/permission_action.model');
var permissionGroupService = require('./permission_group.service');

const getListPermissionAction = async(name) => {
    try{
        // const
        const listPermission = await permissionActionModel.find().lean();
        const listFeatureUse = [];
        listPermission.forEach(item => {
           // console.log('item: ', item)
            item.action_feature.forEach(each => {
                listFeatureUse.push(each)
            })
        });
        const groupPermission = await permissionGroupService.findGroupPermissionByName(name);
        const listFeatureOfGroup = groupPermission.action;
        const result = {
            listFeature: listFeatureUse,
            listFeatureOfGroup: listFeatureOfGroup
        }
        return result;
    }catch(err){
        throw err;
    }
}

const getPermissionActionByName = async(name) => {
    try{
        return await permissionActionModel.findOne({
            name_feature: name
        }).lean();
    }catch(err){
        throw err;
    }
}

const updatePermissionActionByName = async(body) => {
    try{
        console.log('body: ', body.create_by);
        return await permissionActionModel.findOneAndUpdate({
            name_feature: body.name_feature
        }, {
            action_feature: body.action_feature,
            update_by: body.create_by,
            update_date: Date.now()
        })
    }catch(err){
        throw err;
    }
}

const createAndUpdateGroupDetail = async(body) => {
    try {
        
        const checkExist = await getPermissionActionByName(body.name_feature);
        if(checkExist){
            await updatePermissionActionByName(body);
        }else
            await permissionActionModel.create(body);
    } catch (error) {
        throw error;
    }
}



module.exports ={
    createAndUpdateGroupDetail,
    getPermissionActionByName,
    getListPermissionAction
}