import {handleCreateUser, handleGetListUser,
handleGetUser, handleUpdateUser} from '/dist/js/api/userApi.js';
const nameCreateUser = document.querySelector('#InputNameCreateUser');
const username = document.querySelector('#InputUsernameCreateUser');
const password = document.querySelector('#InputPasswordCreateUser');
const formCreateUser = document.querySelector('#LogCreateUser');
const permission = document.querySelector('#ChoosePermission');
const errorCreateUser = document.querySelector('#ErrorCreateUser');
const formUpdate = document.querySelector('#LogUpdateUser');
const nameUpdateUser = document.querySelector('#InputNameUpdateUser');
const usernameUpdate = document.querySelector('#InputUsernameUpdateUser');
const permissionUpdate = document.querySelector('#UpdateChoosePermission');

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
const showError = (input, message) => {
    const formField = input.parentElement;
    input.classList.remove('success');
    input.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove('error');
    input.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkNameCreateUser = (nameParams) => {
    let valid = false;
    const min = 3,
        max = 25;
    const nameTest = nameParams.value.trim();
    if (!isRequired(nameTest)) {
        showError(nameParams, 'Tên không được bỏ trống.');
    } else if (!isBetween(nameTest.length, min, max)) {
        showError(nameParams, `Tên có độ dài ở giữa ${min} và ${max} ký tự.`)
    } else {
        showSuccess(nameParams);
        valid = true;
    }
    return valid;
};

const checkUsername = (parameter) => {
    let valid = false;
    const min = 3,
        max = 25;
    const usernameTest = parameter.value.trim();
    if (!isRequired(usernameTest)) {
        showError(parameter, 'Tên đăng nhập không được bỏ trống.');
    } else if (!isBetween(usernameTest.length, min, max)) {
        showError(parameter, `Tên đăng nhập có độ dài ở giữa ${min} và ${max} ký tự.`)
    } else {
        showSuccess(parameter);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const passwordTest = password.value.trim();
    if (!isRequired(passwordTest)) {
        showError(password, 'Mật khẩu không được để trống');
    } else if (!isPasswordSecure(passwordTest)) {
        showError(password, 'Mật khẩu phải có ít nhất 8 ký tự trong đó có ít nhất 1 ký tự viết thường, 1 ký tự viết hoa, 1 số và 1 ký tự đặc biệt trong (! @ # $% ^ & *)');
    } else {
        showSuccess(password);
        valid = true;
    }
    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
if(formCreateUser){
    formCreateUser.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'InputNameCreateUser':
                checkNameCreateUser(nameCreateUser);
                break;
            case 'InputUsernameCreateUser':
                checkUsername(username);
                break;
            case 'InputPasswordCreateUser':
                checkPassword();
                break;
        }
    }));
}
function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}
formCreateUser.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        let isUsernameValid = checkUsername(username),
            isPasswordValid = checkPassword(),
            isNameValid = checkNameCreateUser(nameCreateUser)
    
        let isFormValid = isUsernameValid &&
            isPasswordValid && isNameValid
        if(isFormValid){
            const bodyPost = {
                name: nameCreateUser.value,
                username: username.value,
                password: password.value,
                role: permission.value,
                roleDetail: permission.options[permission.selectedIndex].text
            };
            const user = await handleCreateUser(bodyPost);
            errorCreateUser.textContent = '';
            if(user.ErrorCode != 0){
                errorCreateUser.textContent = 'Tên đăng nhập đã tồn tại'
            }
            else{
                $("#modal-default").modal('hide');
                const listStaff = await handleGetListUser();
                $("#table-user tr").remove();
                const arrUser = listStaff.Result;
                var htmlTable = "";
                arrUser.forEach(item => {
                    const newDate = new Date(item.create_date);
                    const dateString = getFormattedDate(newDate);
                    htmlTable+=`
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.username}</td>
                        <td>${item.roleDetail}</td>
                        <td>${dateString}</td>
                        <td><a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-default-update-user">
                        <i class="fas fa-pencil-alt">
                        </i>
                        Chỉnh sửa
                    </a></td>
                    </tr>`;
                });
                var tableUser = document.getElementById('table-user');
                tableUser.innerHTML = htmlTable;
                username.value = '';
                password.value = '';
                nameCreateUser.value = '';
            }
                
        }
    } catch (error) {
        console.log('error: ', error);
    }
});


$(document).on('click','#table-user tr td', async function () {
       try {
       // alert('123213')
        var currentRow=$(this).closest("tr");
        var usernameDetail = currentRow.find("td:eq(1)").html();
        const getUser = await handleGetUser(usernameDetail);
        const userTemp = getUser.Result;
        nameUpdateUser.value = userTemp.name;
        usernameUpdate.value = userTemp.username;
        $('#UpdateChoosePermission').val(userTemp.role).change();
        
    } catch (error) {
        console.log('error: ', error);
    }
});


formUpdate.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        console.log('e: ', e);
        //if(isFormValid){
        let isNameValid = checkNameCreateUser(nameUpdateUser)
    
        let isFormValid = isNameValid;
        if(isFormValid){
            const bodyPost = {
                name: nameUpdateUser .value,
                username: usernameUpdate.value,
                role: permissionUpdate.value,
                roleDetail: permissionUpdate.options[permissionUpdate.selectedIndex].text
            };
            const user = await handleUpdateUser(bodyPost);
            console.log('user: ', user);
                //errorCreateUser.textContent = '';
            $("#modal-default-update-user").modal('hide');
            const listStaff = await handleGetListUser();
            $("#table-user tr").remove();
            const arrUser = listStaff.Result;
            var htmlTable = "";
            arrUser.forEach(item => {
            const newDate = new Date(item.create_date);
            const dateString = getFormattedDate(newDate);
            htmlTable+=`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.username}</td>
                    <td>${item.roleDetail}</td>
                    <td>${dateString}</td>
                        <td><a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-default-update-user">
                        <i class="fas fa-pencil-alt">
                        </i>
                        Chỉnh sửa
                    </a></td>
                </tr>`;
                });
            var tableUser = document.getElementById('table-user');
            tableUser.innerHTML = htmlTable;
        }

    } catch (error) {
        console.log('error: ', error);
    }
});