const permissionService = require('../../api/services/permission.service');

const managerPermission = async(req, res) => {
    try {
        //const listStaff = await userService.getListStaff();
        const listPermission = await permissionService.findAll();
        //console.log('list permission: ', listPermission)
        const listFeature = [];
        // listPermission.forEach(item => {
        //     listFeature.push(item.name_detail);
        //     item.arr_name_detail = listFeature;
            
        // })

        console.log('list permission: ', listPermission)
        res.render('managePermission', {
            layout: 'permission',
            user: req.jwtDecode,
            listPermission: listPermission,
           // listFeature: listFeature
          //  listUser: listStaff,
            //listPermission: listPermission
        });
        //res.render('managePermission');
    } catch (error) {
        console.log('error: ', error);
    }
}


module.exports = {
    managerPermission
};