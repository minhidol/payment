import {handleGetListFeature} from '/dist/js/api/permissionApi.js';
import {getCookie, parseJwt} from '/dist/js/helpers/tokenCookie.js';
const permissionGroup = document.querySelector('#InputPermissionGroup');
const selectMultiple = $('#js-example-basic-multiple');

$(document).on('click','#table-permission tr td a', async function () {
    try {
        var currentRow=$(this).closest("tr");
        var permission = currentRow.find("td:eq(0)").html();
        permissionGroup.value = permission;
        const listFeature = await handleGetListFeature();
        const optionFeature = listFeature.Result;
        let count = 0;
        optionFeature.forEach(element => {
            count++;
            $('#js-example-basic-multiple').append(`<option value="${element.name}">
            ${element.name_detail}
            </option>`);
        });
        const token = getCookie('token');

        const optionChooseFromToken = parseJwt(token).payload.action;
        const listOptionSelected = [];
        optionChooseFromToken.forEach(item => {
            //console.log('item: ', item)
            console.log('item: ', item)
            optionFeature.forEach(each => {
            //     //console.log('each: ', each)
                if(item.name_detail == each.name_detail)
                    //console.log('item: ', item)
                    listOptionSelected.push(item.name)
            })
        })
        // console.log('list: ', optionFeature)
        // console.log('option choose: ', listOptionSelected)
        $("#js-example-basic-multiple").val(listOptionSelected);
        
 } catch (error) {
     console.log('error: ', error);
 }
});

$(document).ready(function() {
    $('#js-example-basic-multiple').select2();
});