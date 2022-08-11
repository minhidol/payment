import {handleGetListFeature, handleUpdateListFeature} from '/dist/js/api/permissionApi.js';
const permissionGroup = document.querySelector('#InputPermissionGroup');
const selectMultiple = $('#js-example-basic-multiple');
const formUpdate = document.querySelector('#FormPermission');
$(document).on('click','#table-permission tr td a', async function () {
    try {
        var currentRow=$(this).closest("tr");
        var permission = currentRow.find("td:eq(0)").html();
        permissionGroup.value = permission;
        const listFeature = await handleGetListFeature(permission);
        const optionFeature = listFeature.Result;
        console.log('option feature: ', optionFeature)
        $('#js-example-basic-multiple')
            .find('option')
            .remove()
        optionFeature.listFeature.forEach(element => {
            $('#js-example-basic-multiple').append(`<option value="${element.name}">
            ${element.name_detail}
            </option>`);
        });
        const listOptionSelected = [];
        optionFeature.listFeatureOfGroup.forEach(item => {
            listOptionSelected.push(item.name)
        })
        $("#js-example-basic-multiple").val(listOptionSelected);
        
 } catch (error) {
     console.log('error: ', error);
 }
});

$(document).ready(function() {
    $('#js-example-basic-multiple').select2();
});

formUpdate.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        var actionTextSelected = [];
        var actionValue = selectMultiple.val();
        var optionSelected = [];
        for (var i = 0; i < actionValue.length; i++) {
            var label = selectMultiple.find('option[value="'+actionValue[i]+'"]').text().trim();
            optionSelected.push({
                name: actionValue[i],
                action: label
            })
        }
        const data = {
            name: permissionGroup.value,
            action: optionSelected
        }
        console.log('action selected: ', optionSelected)
        await handleUpdateListFeature(data);
        
        // let isFormValid = isNameValid;
        $("#modal-default-permission").modal('hide');
  

    } catch (error) {
        console.log('error: ', error);
    }
});