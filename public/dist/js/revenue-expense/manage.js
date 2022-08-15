import {handleCreateRevenueExpense, handleGetListRevenueExpense} 
    from '/dist/js/api/revenueExpenseApi.js';
const type = document.querySelector('#ChooseRevenue');
const note = document.querySelector('#InputNoter');
const total = document.querySelector('#InputTotalTypeRevenueExpense');
const formRevenueExpense = document.querySelector('#FormRevenueExpense');
const totalRevenueExpense = document.querySelector('#total-revenue-expense');
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
                var pagination = document.getElementById('PaginationGeneral')
                //console.log('table: ', tableRevenueExpense)
                tableRevenueExpense.innerHTML = htmlLi;
                console.log('pagination: ', ulPagination);
                $('#PaginationGeneral li').remove();
                let stringPagination = '';
                stringPagination+=`<li class="paginate_button page-item previous disabled" id="example2_previous" disabled>
                <a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link" >
                  Previous
                </a>
              </li>
              <li class="paginate_button page-item active">
                <a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">
                  1
                </a>
              </li>`;
                pagination.innerHTML = stringPagination;
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
        var buttonPrevious = $('#PaginationGeneral li#example2_previous');
        var totalPages = document.getElementById('total-pages').innerHTML.trim();
        var buttonNext = $('#PaginationGeneral li#example2_next');
        buttonPrevious[0].classList.remove('disabled');
        buttonNext[0].classList.remove('disabled');
        var isButtonNext = this.classList.contains('next');
        var isButtonPrevious = this.classList.contains('previous');
        var pageCurrent = Number(paginateActive[0].textContent.trim());
        let page = 1;
        if(isButtonNext){
            if(pageCurrent == totalPages){
                buttonNext[0].classList.add('disabled');
                return;
            }
            var nextActive = paginateActive.next();
            nextActive[0].classList.add('active');
            page = pageCurrent + 1;
            console.log('page: ', page);
        }else if(isButtonPrevious){
            if(pageCurrent == 1){
                buttonPrevious[0].classList.add('disabled');
                return;
            }
            var prevActive = paginateActive.prev();
            prevActive[0].classList.add('active');
            page = pageCurrent - 1;
            console.log('page: ', page);
        }else{
            this.classList.add('active');
            page = this.textContent.trim();
        }
        if(page == 1){
            buttonPrevious[0].classList.add('disabled');
        }
        if(page == totalPages){
            buttonNext[0].classList.add('disabled');
        }
        paginateActive[0].classList.remove('active');
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
        
        if(getListRevenueExpense.Result.pages == page){
            buttonNext[0].classList.add('disabled');
        }
 } catch (error) {
     console.log('error: ', error);
 }
});


