var permissionActionModel = require('../models/permission_action.model');

const getListPermissionAction = async() => {
    try{
        
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