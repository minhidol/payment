import { handleGetMenuAction} from '/dist/js/api/menuActionApi.js';
import { handleUpdateMenuAction,
    handleGetPermission
} from '/dist/js/api/permissionApi.js';

$(document).ready(function(){
    $("#select-permission").change(async function(){
    $("#treeview").hummingbird("uncheckAll");
    $("#treeview").hummingbird("uncheckNode",{
       sel:"id",// "id", "data-id" or "text"
        vals:["hum_1","hum_2","hum_3"],
        });
             
            
        var selectedOption = $(this).find(":selected").val();
        const getPermission = await handleGetPermission(
            selectedOption
       );
       console.log('list: ', getPermission)
       const permission = getPermission.Result;
       const list_action = permission.menu_action.list_action;
        const listId = [];
        list_action.forEach(item => {
            listId.push(item.id);
        })
        $("#treeview").hummingbird("checkNode",{
            sel:"id",// "id", "data-id" or "text"
            vals:listId,
        });
    });
});

$('button#submit-permission-action').click(async function(){
    var list = {"id" : [],"dataid" : [],"text" : [], "id_parent_menu": [],
     "id_parent_sub_menu": [], "type_permission": [], "link": []};
    $("#treeview").hummingbird("getChecked",{
        list:list,
    });
    const listActionSelected = [];
    const listSubMenuSelected = [];
    for(let i = 0; i < list.id.length; i++){
        if(list.type_permission[i] == 'action'){
            listActionSelected.push({
                id: list.id[i],
                parent_menu: list.id_parent_menu[i],
                parent_sub_menu: list.id_parent_sub_menu[i],
                link: list.link[i],
                type: 'action'
            })
        }
        listSubMenuSelected.push({
            id: list.id[i],
            parent_menu: list.id_parent_menu[i],
            parent_sub_menu: list.id_parent_sub_menu[i],
            type: list.type_permission[i]
        })
    }
    const listMenuSelected = [];
    const unique = [];
    listActionSelected.forEach(item => {
        let checkExist = unique.includes(item.parent_menu);
        if(!checkExist){
            unique.push(item.parent_menu);
            listMenuSelected.push({
                id: item.parent_menu,
                type: 'menu'
            })
        }
    });
    const uniqueSubMenu = [];
    listMenuSelected.forEach(item => {
        let tempSubMenu = [];
        for(let i = 0; i < listActionSelected.length; i++){
            const check = uniqueSubMenu.includes(listActionSelected[i].parent_sub_menu);
            if(listActionSelected[i].parent_menu == item.id && 
                listActionSelected[i].parent_sub_menu != '' && !check
            ){
                uniqueSubMenu.push(listActionSelected[i].parent_sub_menu);
                tempSubMenu.push({
                    id: listActionSelected[i].parent_sub_menu,
                    parent_menu: listActionSelected[i].parent_menu,
                    type: 'sub_menu'
                })
            }
        }
        item.list_sub_menu = tempSubMenu;
    })
    const data = {
        menu_action: {
            list_menu: listMenuSelected,
            list_action: listActionSelected,
        },
        type: $("#select-permission option:selected").val(),
    }
    console.log('data: ', data);
    const updateMenuAction = await handleUpdateMenuAction(data);

    $('#message-success').modal();
    

});

$( document ).ready(async function() {
    const getMenuAction = await handleGetMenuAction();
    const listMenuAction = getMenuAction.Result;
    console.log({listMenuAction})
    let tempHtmlListPermission = '';
    listMenuAction.forEach(element => {
        const listSubMenu = element.list_sub_menu;
        let strSubMenu = '';
        listSubMenu.forEach(subMenu => {
            let strAction = '';
            listSubMenu.forEach(item => {
                if(item.type == 'action' && item.parent_sub_menu == subMenu.id){
                    strAction += 
                    ` <li>
                        <label class="label-treebox">
                        <input class="hummingbird-end-node" 
                            id="${item.id}" data-id="${item.id}" 
                            id_parent_menu="${item.parent_menu}"
                            id_parent_sub_menu="${item.parent_sub_menu}"
                            type_permission="${item.type}"
                            link="${item.link}"
                            type="checkbox" />
                        <i class="fa fa-folder" style="border: none;font-size:1.2rem;color:green;position:relative;top:0px"></i>
                                        ${item.name}
                        </label>
                    </li>`;
                }
            })
            if(subMenu.type == 'sub_menu'){
                strSubMenu += ` 
                    <li data-id="1">
                        <i class="fa fa-minus"></i>
                        <label class="label-treebox"> 
                            <input  id="${subMenu.id}" data-id="${subMenu.id}" 
                            id_parent_menu="${subMenu.parent_menu}"
                            id_parent_sub_menu="${subMenu.parent_sub_menu}"
                            type_permission="${subMenu.type}"
                            type="checkbox" /> 
                            <i class="fa fa-folder" style="border: none;font-size:1.2rem;color:green;position:relative;top:0px"></i>
                            ${subMenu.name}
                        </label>
                        <ul class="ul-action" style='display:block'>
                            ${strAction}
                        </ul>
                    </li>`;
            }
            else if(subMenu.type == 'action' && subMenu.parent_sub_menu == ''){
                strSubMenu += ` 
                    <li data-id="1">
                        <label class="label-treebox"> 
                            <input  id="${subMenu.id}" data-id="${subMenu.id}" 
                            id_parent_menu="${subMenu.parent_menu}"
                            id_parent_sub_menu="${subMenu.parent_sub_menu}"
                            type_permission="${subMenu.type}" 
                            type="checkbox" /> 
                            <i class="fa fa-folder" style="border: none;font-size:1.2rem;color:green;position:relative;top:0px"></i>
                            ${subMenu.name}
                        </label>
                    </li>`;
            }
        })
        tempHtmlListPermission += `
            <li data-id="0" class="jstree-node  jstree-leaf">
                <i class="fa fa-minus"></i>
                <label class="label-treebox">
                    <input id="${element.id}" data-id="${element.id}" 
                    id_parent_menu="${element.parent_menu}"
                    id_parent_sub_menu="${element.parent_sub_menu}"
                    type_permission="${element.type}"
                     type="checkbox" /> 
                    <i class="fa fa-folder" style="border: none;font-size:1.2rem;color:green;position:relative;top:0px"></i>
                    ${element.name}
                </label>
                <ul style='display: block'>
                    ${strSubMenu}
                </ul>
             </li>`
    });
    $('#treeview').html(tempHtmlListPermission);

    $("#treeview").hummingbird();
    const getPermission = await handleGetPermission(
        1
   );
   const permission = getPermission.Result;
   const list_action = permission.menu_action.list_action;
    const listId = [];
    list_action.forEach(item => {
        listId.push(item.id);
    })
    $("#treeview").hummingbird("checkNode",{
        sel:"id",// "id", "data-id" or "text"
        vals:listId,
    });
});