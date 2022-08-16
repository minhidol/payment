
const userService = require('../../api/services/user.service');
const groupPermissionService = require('../../api/services/permission_group.service');

const managerUser = async(req, res) => {
    try {
        const listStaff = await userService.getListStaff();
        const listPermission = await groupPermissionService.findAll();
        res.render('formCreateUser', {
            layout: 'index',
            user: req.jwtDecode,
            listUser: listStaff,
            listPermission: listPermission
        });
    } catch (error) {
        console.log('error');
    }
}


module.exports = {
    managerUser
};