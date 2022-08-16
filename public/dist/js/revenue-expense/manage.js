import {handleCreateRevenueExpense, handleGetListRevenueExpense, handleFilterRevenueExpense} 
    from '/dist/js/api/revenueExpenseApi.js';
const type = document.querySelector('#ChooseRevenue');
const note = document.querySelector('#InputNoter');
const total = document.querySelector('#InputTotalTypeRevenueExpense');
const formRevenueExpense = document.querySelector('#FormRevenueExpense');
const totalRevenueExpense = document.querySelector('#total-revenue-expense');
const ulPagination = document.querySelector('#PaginationGeneral');
const formSearchRevenueExpense = document.querySelector('#searchRevenueExpense');
const reservation = document.querySelector('#reservation');
const selectTypeRevenue = document.querySelector('#type-revenue');

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

formSearchRevenueExpense.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const dateString = reservation.value.split('-').map(element => element.trim());;
        const typeSelect = $( "#type-revenue option:selected" ).text();
        const query = {
            page: 1,
            perPage: 10,
            dateSearch: dateString,
            type: typeSelect
        };
        const listResult = await handleFilterRevenueExpense(query);
        if(listResult.Result.total == 0){
            alert('Không tìm thấy dữ liệu!');
            return;
        }
        
        var typePagination = document.getElementById('type-pagination');
        typePagination.innerHTML = 2;
        setDateTotable(listResult)
    } catch (error) {
        console.log('error: ', error)
        //errorLogin.textContent = 'Server bị lỗi!';
        return;
    }
});

if(formRevenueExpense){
    formRevenueExpense.addEventListener('submit', async function (e) {
        try {
            e.preventDefault();
            let isTotalValid = checkTotal();
            let isFormValid = isTotalValid;
            if (isFormValid) {
                await handleCreateRevenueExpense({
                    type: $( "#ChooseRevenue option:selected" ).text(),
                    total: total.value,
                    note: note.value
                });
                const getListRevenueExpense = await handleGetListRevenueExpense({
                    page: 1,
                    perPage: 10
                });
                setDateTotable(getListRevenueExpense);
                $("#modal-default-revenue-expense").modal('hide');
                var typePagination = document.getElementById('type-pagination');
                typePagination.innerHTML = 1;
            }
        } catch (error) {
            console.log('error: ', error)
            //errorLogin.textContent = 'Server bị lỗi!';
            return;
        }
    });
}

$(document).on('click','#PaginationGeneral li', async function () {
    try {
        var paginateActive = $('#PaginationGeneral li.active');
        var buttonPrevious = $('#PaginationGeneral li#example2_previous');
        var totalPages = document.getElementById('total-pages').innerHTML.trim();
        var buttonNext = $('#PaginationGeneral li#example2_next');
        buttonPrevious[0].classList.remove('disabled');
        buttonNext[0].classList.remove('disabled');
        if(totalPages == 1){
            console.log(1)
            buttonPrevious[0].classList.add('disabled');
            buttonNext[0].classList.add('disabled');
        }
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
            paginateActive[0].classList.remove('active');
        }else if(isButtonPrevious){
            console.log('12312')
            if(pageCurrent == 1){
                console.log(22222)
                buttonPrevious[0].classList.add('disabled');
                return;
            }
            var prevActive = paginateActive.prev();
            prevActive[0].classList.add('active');
            page = pageCurrent - 1;
            paginateActive[0].classList.remove('active');
        }else{
            if(this.textContent ==  paginateActive[0].textContent){
                if(pageCurrent == 1){
                    buttonPrevious[0].classList.add('disabled');
                }
                if(pageCurrent == totalPages){
                    console.log('total pages')
                    buttonNext[0].classList.add('disabled');
                }
                return;
            }
            else{
                paginateActive[0].classList.remove('active');
                this.classList.add('active');
                page = this.textContent.trim();
            }
        }
        if(page == 1){
            buttonPrevious[0].classList.add('disabled');
        }
        if(page == totalPages){
            buttonNext[0].classList.add('disabled');
        }
        var typePagination = document.getElementById('type-pagination').textContent;
        console.log('type pagination: ', typePagination.textContent)
        let getListRevenueExpense = {};
        if(typePagination == 1){
            getListRevenueExpense = await handleGetListRevenueExpense({
                page: page,
                perPage: 10
            });
        }else{
            const dateString = reservation.value.split('-').map(element => element.trim());;
            const typeSelect = $( "#type-revenue option:selected" ).text();
            const query = {
                page: page,
                perPage: 10,
                dateSearch: dateString,
                type: typeSelect
            };
            getListRevenueExpense = await handleFilterRevenueExpense(query);
        }
        
        setTablePagination(getListRevenueExpense);
        if(getListRevenueExpense.Result.pages == page){
            buttonNext[0].classList.add('disabled');
        }
 } catch (error) {
     console.log('error: ', error);
 }
});

async function setTablePagination(getListRevenueExpense){
    $("#body-revenue-expense").find('tr').remove();
        const data = getListRevenueExpense.Result.data;
        let htmlLi = "";
        data.forEach(item => {
            htmlLi+=`
            <tr class="odd">
                <td>${item.create_date}</td>
                <td>${item.total}</td>
                <td>${item.type}</td>
                <td>${item.note}</td>
                <td class="project-actions text-center" style="align-items: center;">
            <a class="btn btn-primary btn-sm" href="#">
                <i class="fas fa-folder">
                </i>
                Chi tiết
            </a>
            <a class="btn btn-danger btn-sm" href="#">
                <i class="fas fa-trash">
                </i>
                Xóa
            </a>
        </td>
            </tr>`;
        })
        $('html, body').animate({
            scrollTop: $("#table-revenue-expense").offset().top
        }, 1000);
        var tableRevenueExpense = document.getElementById('body-revenue-expense');
        tableRevenueExpense.innerHTML = htmlLi;
        var totalPagesAdd = document.getElementById('total-pages');
        totalPagesAdd.innerHTML = getListRevenueExpense.Result.pages;
       
  
}

async function setDateTotable(getListRevenueExpense){
    $("#body-revenue-expense").find('tr').remove();
    const data = getListRevenueExpense.Result.data;
    const totalPages = getListRevenueExpense.Result.pages;
    let htmlLi = "";
    data.forEach(item => {
        item.create_date
        htmlLi+=`
        <tr class="odd">
            <td>${item.create_date}</td>
            <td>${item.total}</td>
            <td>${item.type}</td>
            <td>${item.note}</td>
            <td class="project-actions text-center" style="align-items: center;">
            <a class="btn btn-primary btn-sm" href="#">
                <i class="fas fa-folder">
                </i>
                Chi tiết
            </a>
            <a class="btn btn-danger btn-sm" href="#">
                <i class="fas fa-trash">
                </i>
                Xóa
            </a>
        </td>
        </tr>`;
    })
    var tableRevenueExpense = document.getElementById('body-revenue-expense');
    var pagination = document.getElementById('PaginationGeneral')
    tableRevenueExpense.innerHTML = htmlLi;
    $('#PaginationGeneral li').remove();
    let stringPagination = '';
    stringPagination+=`<li class="paginate_button page-item previous disabled" id="example2_previous" disabled>
    <a aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link" >
      Previous
    </a>
  </li>
  <li class="paginate_button page-item active">
    <a  aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">
      1
    </a>
  </li>`;
    for(let i = 2; i <= totalPages; i++){
        stringPagination+=`<li class="paginate_button page-item ">
        <a aria-controls="example2" data-dt-idx=${i} tabindex="0" class="page-link">${i}</a>
    </li>`
    }
    if(totalPages == 1){
        //console.log('1')
        stringPagination+=` <li class="paginate_button page-item next disabled" id="example2_next" disabled>
            <a aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
        </li>`;
    }else{
        // console.log('2')
        stringPagination+=` <li class="paginate_button page-item next" id="example2_next">
        <a  aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
        </li>`;
    }
    
    pagination.innerHTML = stringPagination;
    var totalPagesAdd = document.getElementById('total-pages');
    totalPagesAdd.innerHTML  = totalPages;
    totalRevenueExpense.textContent = getListRevenueExpense.Result.total;
    
    $('html, body').animate({
        scrollTop: $("#table-revenue-expense").offset().top
    }, 1000);
}

