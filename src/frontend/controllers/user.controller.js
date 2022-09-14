
const userService = require('../../api/services/user.service');
const permissionService = require('../../api/services/permission.service');

const managerUser = async(req, res) => {
    try {
        const listStaff = await userService.getListStaff();
        const listPermission = await permissionService.findAll();

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