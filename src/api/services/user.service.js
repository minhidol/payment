const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const constants = require('../../constants/constants');
const permissionGroupService = require('./permission_group.service');
const permissionService = require('./permission.service');
const {generateToken} = require('../helpers/jwt');
const {config} = require('../../../config/env');
const saltRounds = 10;

const updateUser = async(data) => {
  try {
    return await userModel.findOneAndUpdate({
      username: data.username
    },{
      role: data.role,
      roleDetail: data.roleDetail,
      name: data.name,
      update_by: data.update_by,
      update_date: Date.now()
    })
  } catch (error) {
    throw error;
  }
}

const getListStaff = async() => {
  try{
    const listStaff = await userModel.find().lean();
    return listStaff;
  }catch(err){
    throw err;
  }
}

const getUserByUsername = async(username) => {
    try{
    
        return await userModel.findOne({
            username: username,
            is_delete: constants.NOT_DELETED
        });
    }catch(err){
        throw err;
    }
}

const register = async(body) => {
    try {
        const checkUserExist = await getUserByUsername(body.username);
        if(checkUserExist){
            return constants.STATUS_ERROR; 
        }
        await new Promise((resolve, reject) => {
            bcrypt.hash(body.password, saltRounds, async function(err, hash) {
              if (err) reject(err)
              const user = {
                  username: body.username.toLowerCase(),
                  password: hash,
                  name: body.name,
                  role: body.role,
                  roleDetail: body.roleDetail
                };
                await userModel.create(user);
              resolve(constants.STATUS_SUCCESS);
            });
          })
    } catch (error) {
        
        throw error;
}
}

const login = async(body) => {
  try {

     const checkUserExist = await getUserByUsername(body.username);
     if(!checkUserExist){
      return constants.STATUS_ERROR;
    }
    let password = checkUserExist.password;
    const isPasswordValid = await bcrypt.compare(body.password, password);
    if(!isPasswordValid)
      return constants.PASSWORD_NOT_VALID;
    console.log('check exist: ', checkUserExist)
    const permission = await permissionService.getPermissionByTypeForLogin({type: checkUserExist.role});
    console.log({permission})
    // console.log('permission123: ', permission)
    const payload = {
      username: checkUserExist.username,
      name: checkUserExist.name,
      role: checkUserExist.role,
      menu: permission.listMenu,
      action: permission.listLinkAction
    };
    const access_token = await generateToken(payload, config.ACCESS_TOKEN_SECRET, config.ACCESS_TOKEN_LIFE);
    const res = {...payload};
    res.access_token = access_token;
    return res;
    //return permission;
  } catch (error) {
      
      throw error;
}
}

module.exports = {
  register,
  getUserByUsername,
  login,
  getListStaff,
  updateUser
};
