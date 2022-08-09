//import {baseURL} from '/dist/js/constants.js';
import {handleApiLogin} from '/dist/js/api/userApi.js';
const username = document.querySelector('#InputUsername');
const password = document.querySelector('#InputPassword');
const formLogin = document.querySelector('#LogIn');
const errorLogin= document.querySelector('#ErrorLogin');
const handleLogout = document.querySelector('#HandleLogout');

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
if(formLogin){
    formLogin.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'InputUsername':
                checkUsername();
                break;
            case 'InputPassword':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
        }
    }));
}


if(formLogin){
    formLogin.addEventListener('submit', async function (e) {
        try {
            e.preventDefault();
        let isUsernameValid = checkUsername(),
            isPasswordValid = checkPassword()
    
        let isFormValid = isUsernameValid &&
            isPasswordValid 
    
        // submit to the server if the form is valid
        if (isFormValid) {
            const login = await handleApiLogin({
                username: username.value,
                password: password.value
            });
            
            errorLogin.textContent = ''
            if(login == null){
                errorLogin.textContent = 'Server bị lỗi!';
                return;
            }
            if(login.ErrorCode != 0){
                errorLogin.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng';
                return;
            }
            document.cookie = `token=${login.Result.access_token}`;
            window.location.href = "/home";
        }
        } catch (error) {
            errorLogin.textContent = 'Server bị lỗi!';
            return;
        }
    });
    
}

if(handleLogout){
    handleLogout.addEventListener('click', function(e){
        document.cookie = "token=;";
        window.location.href = "/";
    })
}

