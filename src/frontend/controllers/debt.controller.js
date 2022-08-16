
const userService = require('../../api/services/user.service');
const groupPermissionService = require('../../api/services/permission_group.service');

const renderDebt = async(req, res) => {
    try {
        const listStaff = await userService.getListStaff();
        const listPermission = await groupPermissionService.findAll();
        res.render('debt',{
            layout: 'debt',
            user: req.jwtDecode,
            listPermission: listPermission,
            //listFeature: listFeature
          //  listUser: listStaff,
            //listPermission: listPermission
        });
    } catch (error) {
        console.log('error');
    }
}


module.exports = {
    renderDebt
};