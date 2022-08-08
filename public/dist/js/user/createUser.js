import {handleCreateUser, handleGetListUser} from '/dist/js/api/userApi.js';
const nameCreateUser = document.querySelector('#InputNameCreateUser');
const username = document.querySelector('#InputUsernameCreateUser');
const password = document.querySelector('#InputPasswordCreateUser');
const formCreateUser = document.querySelector('#LogCreateUser');
const permission = document.querySelector('#ChoosePermission');
const errorCreateUser = document.querySelector('#ErrorCreateUser');

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

const checkNameCreateUser = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const nameTest = nameCreateUser.value.trim();
    if (!isRequired(nameTest)) {
        showError(nameCreateUser, 'Tên không được bỏ trống.');
    } else if (!isBetween(nameTest.length, min, max)) {
        showError(nameCreateUser, `Tên có độ dài ở giữa ${min} và ${max} ký tự.`)
    } else {
        showSuccess(nameCreateUser);
        valid = true;
    }
    return valid;
};

const checkUsername = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const usernameTest = username.value.trim();
    if (!isRequired(usernameTest)) {
        showError(username, 'Tên đăng nhập không được bỏ trống.');
    } else if (!isBetween(usernameTest.length, min, max)) {
        showError(username, `Tên đăng nhập có độ dài ở giữa ${min} và ${max} ký tự.`)
    } else {
        showSuccess(username);
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
                checkNameCreateUser();
                break;
            case 'InputUsernameCreateUser':
                checkUsername();
                break;
            case 'InputPasswordCreateUser':
                checkPassword();
                break;
        }
    }));
}

formCreateUser.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        console.log('e: ', e);
        let isUsernameValid = checkUsername(),
            isPasswordValid = checkPassword(),
            isNameValid = checkNameCreateUser()
    
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
                $("#table-user").empty();
                const arrUser = listStaff.Result;
                arrUser.forEach(item => {
                    $("#table-user").append(`
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.username}</td>
                        <td>${item.roleDetail}</td>
                        <td>${item.create_date}</td>
                    </tr>`);
                })
            }
                
        }
    } catch (error) {
        console.log('error: ', error);
    }
    
    
});

