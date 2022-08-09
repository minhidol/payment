
//const userService = require('../../api/services/user.service');
const permissionActionService = require('../../api/services/permission_action.service');

const managerPermission = async(req, res) => {
    try {
        //const listStaff = await userService.getListStaff();
        //const listPermission = await groupPermissionService.findAll();
        res.render('managePermission', {
            user: req.jwtDecode,
          //  listUser: listStaff,
            //listPermission: listPermission
        });
        //res.render('managePermission');
    } catch (error) {
        console.log('error');
    }
}


module.exports = {
    managerPermission
};