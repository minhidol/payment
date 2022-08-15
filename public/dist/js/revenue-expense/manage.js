import {handleCreateRevenueExpense, handleGetListRevenueExpense} 
    from '/dist/js/api/revenueExpenseApi.js';
const type = document.querySelector('#ChooseRevenue');
const note = document.querySelector('#InputNoter');
const total = document.querySelector('#InputTotalTypeRevenueExpense');
const formRevenueExpense = document.querySelector('#FormRevenueExpense');
const ulPagination = document.querySelector('#PaginationGeneral');

const isRequired = value => value === '' ? false : true;
const isNumber = (val) => {
    return /^\d+$/.test(val);
}
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
const checkTotal = () => {
    let valid = false;
    const totalValid = total.value.trim();
    if (!isRequired(totalValid)) {
        showError(total, 'Số tiền không được bỏ trống.');
    } else if(!isNumber(totalValid)){
        showError(total, 'Số tiền không được chứa chữ.');
    }
    else{
        showSuccess(total);
        valid = true;
    }
    return valid;
};
function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return day + '/' + month + '/' + year;
}

if(formRevenueExpense){
    formRevenueExpense.addEventListener('submit', async function (e) {
        try {
            e.preventDefault();
            let isTotalValid = checkTotal();
            let isFormValid = isTotalValid;
            if (isFormValid) {
                console.log('123123');
                console.log('aa: ', {
                    type: type.value,
                    total: total.value,
                    note: note.value
                })
                await handleCreateRevenueExpense({
                    type: type.value,
                    total: total.value,
                    note: note.value
                });
                
                const getListRevenueExpense = await handleGetListRevenueExpense({
                    page: 1,
                    perPage: 10
                });
                console.log('result: ', getListRevenueExpense);
                $("#body-revenue-expense").find('tr').remove();
                const data = getListRevenueExpense.Result.data;
                let htmlLi = "";
                data.forEach(item => {
                    const newDate = new Date(item.create_date);
                    const dateString = getFormattedDate(newDate);
                    htmlLi+=`
                    <tr class="odd">
                        <td>${dateString}</td>
                        <td>${item.total}</td>
                        <td>${item.note}</td>
                    </tr>`;
                })
                var tableRevenueExpense = document.getElementById('body-revenue-expense');
                //console.log('table: ', tableRevenueExpense)
                tableRevenueExpense.innerHTML = htmlLi;
                $("#modal-default-revenue-expense").modal('hide');

            }
        } catch (error) {
            console.log('error: ', error)
            //errorLogin.textContent = 'Server bị lỗi!';
            return;
        }
    });
}

// if(handleLogout){
//     handleLogout.addEventListener('click', function(e){
//         document.cookie = "token=;";
//         window.location.href = "/";
//     })
// }
$(document).on('click','#PaginationGeneral li', async function () {
    try {
        var paginateActive = $('#PaginationGeneral li.active');
        var isButtonNext = this.classList.contains('next');
        var isButtonPrevious = this.classList.contains('previous');
        paginateActive[0].classList.remove('active');
        
        var pageCurrent = Number(paginateActive[0].textContent.trim());
        let page = 1;
        if(isButtonNext){
            var nextActive = paginateActive.next();
            nextActive[0].classList.add('active');
            page = pageCurrent + 1;
        }else if(isButtonPrevious){
            var prevActive = paginateActive.prev();
            prevActive[0].classList.add('active');
            console.log('previous');
        }else{
            this.classList.add('active');
            page = this.textContent.trim();
        }
        const getListRevenueExpense = await handleGetListRevenueExpense({
            page: page,
            perPage: 10
        });
        $("#body-revenue-expense").find('tr').remove();
        const data = getListRevenueExpense.Result.data;
        let htmlLi = "";
        data.forEach(item => {
            const newDate = new Date(item.create_date);
            const dateString = getFormattedDate(newDate);
            htmlLi+=`
            <tr class="odd">
                <td>${dateString}</td>
                <td>${item.total}</td>
                <td>${item.note}</td>
            </tr>`;
        })
        var tableRevenueExpense = document.getElementById('body-revenue-expense');
        tableRevenueExpense.innerHTML = htmlLi;
        
 } catch (error) {
     console.log('error: ', error);
 }
});


