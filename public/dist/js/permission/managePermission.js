import {handleGetListFeature} from '/dist/js/api/permissionApi.js';
const permissionGroup = document.querySelector('#InputPermissionGroup');

$(document).on('click','#table-permission tr td', async function () {
    try {
        //alert('123')
        var currentRow=$(this).closest("tr");
        var permission = currentRow.find("td:eq(0)").html();
        console.log('permission: ', permission)
        permissionGroup.value = permission;
     const getUser = await handleGetUser(usernameDetail);
     const userTemp = getUser.Result;
     nameUpdateUser.value = userTemp.name;
     usernameUpdate.value = userTemp.username;
     $('#UpdateChoosePermission').val(userTemp.role).change();
     
 } catch (error) {
     console.log('error: ', error);
 }
});

$(document).ready(function() {
    $('#js-example-basic-multiple').select2();
    
});