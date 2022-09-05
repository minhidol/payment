import {
  handleCreateInterestLoans,
  handleFilterInterestLoans ,
  handleGetListInterestLoansByUsername
  } from "/dist/js/api/interestLoansApi.js";
  const total = document.querySelector("#InputTotalTypeRevenueExpense");
  const formRevenueExpense = document.querySelector("#FormRevenueExpense");
  const formSearchRevenueExpense = document.querySelector(
    "#searchRevenueExpense"
  );
  const receiver = document.querySelector("#InputReceiver");
  const totalRevenueExpense = document.querySelector("#total-revenue-expense");
  const note = document.querySelector("#InputNoter");

const inputClient = document.querySelector("#InputClient");
const inputNumberPhone = document.querySelector("#InputNumberPhone");
const inputCmnd= document.querySelector("#InputCmnd");
const inputCmndDate= document.querySelector("#InputCmndDate");
const inputCmndAddress= document.querySelector("#InputCmndAddress");
const inputAddress= document.querySelector("#InputAddress");
const selectAsset = document.querySelector("#type-asset");
const inputNameAsset = document.querySelector('#InputNameAsset');
const inputTotal = document.querySelector("#InputTotal");
const selectFormProfit= document.querySelector("#form-of-profit");
const inputProfitPeriod = document.querySelector("#InputProfitPeriod");
const inputInterest = document.querySelector("#InputInterest");
const inputReservationInterest = document.querySelector("#reservation_interest");
const inputNote = document.querySelector("#InputNote");
const inputProfitTime = document.querySelector("#InputProfitTime");
const formInterestLoans = document.querySelector("#FormInterestLoans");

$("#type-asset").on('change', function(){
    const typeSelect = $("#type-asset option:selected").val();
    console.log('type select: ', typeSelect)
    if(typeSelect == 1)
        $('#input-name-asset').css("display", "");
    else
        $('#input-name-asset').css("display", "none");
})

$("#form-of-profit").on('change', function(){
  const typeSelect = $("#form-of-profit option:selected").text();
  console.log('type select: ', typeSelect)
  if(typeSelect.includes('tháng')){
    $(".text-black-loan-time").html('Tháng');
    $("#strLoanTimeMoney").html('% /1 tháng');
  }else if(typeSelect.includes('tuần')){
    $(".text-black-loan-time").html('Tuần');
    if(typeSelect.includes('%')){
      $("#strLoanTimeMoney").html('% /1 tuần');
    }else{
      $("#strLoanTimeMoney").html('k /1 tuần');
    }
  }else if(typeSelect.includes('ngày')){
    $(".text-black-loan-time").html('Ngày');
    $("#strLoanTimeMoney").html('k/1 ngày')
  }
})

$('#InputTotal').keyup(function(event) {
    if(event.which >= 37 && event.which <= 40) return;
    $(this).val(function(index, value) {
      return value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      ;
    });
  });
  const isRequired = (value) => (value === "" ? false : true);
  const isNumber = (val) => {
    return /^\d+$/.test(val);
  };
  const showError = (input, message) => {
    let formField;
    if(input.id == 'InputTotal' || input.id == 'InputProfitTime' || input.id == 'InputProfitPeriod' 
    ||input.id == 'InputInterest'){
      formField = input.parentElement.parentElement;
    }else{
      formField = input.parentElement;
    }
    const error = formField.querySelector("small");
    const pError = formField.querySelector("p");
    pError.style.display = "";
    error.textContent = message;
  };
  const showSuccess = (input) => {
    let formField;
    if(input.id == 'InputTotal' || input.id == 'InputProfitTime' || input.id == 'InputProfitPeriod' 
    ||input.id == 'InputInterest'){
      formField = input.parentElement.parentElement;
    }else{
      formField = input.parentElement;
    }
    const error = formField.querySelector("small");
    const pError = formField.querySelector("p");
    pError.style.display = "none";
    error.textContent = "";
  };
  const checkNameClient = () => {
    let valid = false;
    const nameClientValid = inputClient.value.trim();
    if (!isRequired(nameClientValid)) {
      showError(inputClient, "Tên khách hàng không được bỏ trống.");
    } else {
      showSuccess(inputClient);
      valid = true;
    }
    return valid;
  };
  const checkNumberPhone = () => {
    let valid = false;
    const numberPhoneValid = inputNumberPhone.value.trim();
    if (!isRequired(numberPhoneValid)) {
      showError(inputNumberPhone, "Số điện thoại không được bỏ trống.");
    }else if (!isNumber(numberPhoneValid)) {
      showError(inputNumberPhone, "Số điện thoại không được chứa chữ.");
    } 
    else {
      showSuccess(inputNumberPhone);
      valid = true;
    }
    return valid;
  };
  const checkTotal = () => {
    let valid = false;
    const totalValid = inputTotal.value.trim();
    if (!isRequired(totalValid)) {
      showError(inputTotal, "Số tiền được bỏ trống.");
    } else {
      showSuccess(inputTotal);
      valid = true;
    }
    return valid;
  };
  const checkProfitTime= () => {
    let valid = false;
    const profitTimeValid = inputProfitTime.value.trim();
    if (!isRequired(profitTimeValid)) {
      showError(inputProfitTime, "Thời gian vay không được bỏ trống.");
    } else if (!isNumber(profitTimeValid)) {
      showError(inputProfitTime, "Thời gian vay không được chứa chữ.");
    } else {
      showSuccess(inputProfitTime);
      valid = true;
    }
    return valid;
  };
  const checkProfitPeriod = () => {
    let valid = false;
    const profitPeriodValid = inputProfitPeriod.value.trim();
    if (!isRequired(profitPeriodValid)) {
      showError(inputProfitPeriod, "Kỳ lãi không được bỏ trống.");
    } else if (!isNumber(profitPeriodValid)) {
      showError(inputProfitPeriod, "Kỳ lãi không được chứa chữ.");
    }else {
      showSuccess(inputProfitPeriod);
      valid = true;
    }
    return valid;
  };
  const checkInterest = () => {
    let valid = false;
    const interestValid = inputInterest.value.trim();
    if (!isRequired(interestValid)) {
      showError(inputInterest, "Lãi không được bỏ trống.");
    } else if (!isNumber(interestValid)) {
      showError(inputInterest, "Lãi không được chứa chữ.");
    }else {
      showSuccess(inputInterest);
      valid = true;
    }
    return valid;
  };

  
  formSearchRevenueExpense.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      alert('123')
      // const typeSelect = $("#type-revenue option:selected").text();
      // const valueSelected = $("#type-revenue option:selected").val();
      
      // var to_date = $('#reservation_to_date').find('input').val();
      // var from_date = $('#reservation_from_date').find('input').val();
      // const query = {
      //   page: 1,
      //   perPage: 10,
      //   from_date: from_date,
      //   to_date: to_date,
      //   type: typeSelect
      // };
      // if(valueSelected == 0){
      //   query.type = '';
      // }
      // //console.log('query: ', query);
      // const listResult = await handleFilterRevenue(query);
      // if (listResult.Result.total == 0) {
      //   $('#message-not-found').modal();
      //   return;
      // }
  
      // var typePagination = document.getElementById("type-pagination");
      // typePagination.innerHTML = 2;
      // setDateTotable(listResult);
    } catch (error) {
      console.log("error: ", error);
      //errorLogin.textContent = 'Server bị lỗi!';
      return;
    }
  });
const days = (date_1, date_2) => {
  console.log({date_1, date_2})
    let difference = date_1.getTime() - date_2.getTime();
    console.log('different: ', difference)
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}
  if (formInterestLoans) {
    formInterestLoans.addEventListener("submit", async function (e) {
      try {
        e.preventDefault();
        let isNameValid = checkNameClient(),
          isValidNumberPhone = checkNumberPhone(),
          isCheckTotal = checkTotal(),
          isCheckProfitTime = checkProfitTime(),
          isProfitPeriod = checkProfitPeriod(),
          isCheckInterest = checkInterest();

        let isFormValid = isNameValid && isValidNumberPhone && isCheckTotal
        && isCheckProfitTime && isProfitPeriod && isCheckInterest;
        if (isFormValid) {
          const profitForm = $("#form-of-profit option:selected").text();
          const data = {
            name: inputClient.value,
            cmnd: inputCmnd.value,
            cmnd_date: inputCmndDate.value,
            cmnd_address: inputCmndAddress.value,
            address: inputAddress.value,
            number_phone: inputNumberPhone.value,
            type_of_collateral: $("#type-asset option:selected").text(),
            collateral: inputNameAsset.value,
            profit_form: $("#form-of-profit option:selected").val(),
            type_status_profit_form: 'interest_loans',
            total: inputTotal.value,
            status: '',
            term_of_loan: inputProfitTime.value,
            deadline_loans: inputProfitPeriod.value,
            interest: inputInterest.value,
            profit_form_string: profitForm,
            status: 'Đang vay'
          };
          if(profitForm.includes('k/'))
            data.currency_unit = 'k'
          else 
            data.currency_unit = '%'
          if(profitForm.includes('tháng')){
            data.time_unit = 'tháng';
            var date = new Date();
            var newDate = new Date(date.setMonth(date.getMonth()+8));
            var dateNow = new Date();
            data.number_of_days_loans = days(newDate, dateNow);
            const period = parseInt(inputProfitTime.value/inputProfitPeriod.value);
            const surplus = inputProfitTime.value%inputProfitPeriod.value;
            const length = surplus + period;
            const periodLoansArray = [];
            let from_date = inputReservationInterest.find('input').val();
            let to_date = new Date(from_date.setMonth(from_date.getMonth() + inputProfitPeriod.value));
            console.log({from_date, to_date})
            // for(let i = 1; i <= length; i++){
            //   if(i == period){

            //   }
              
            // }
          }
          else if(profitForm.includes('ngày')){
            data.time_unit = 'ngày';
            data.number_of_days_loans = inputProfitTime.value;
          }            
          else{
            data.time_unit = 'tuần';
            data.number_of_days_loans = inputProfitTime.value*7;
          }
            
          //console.log('data: ', data)
          // await handleCreateInterestLoans(data);
          // const getListLoans = await handleGetListInterestLoansByUsername({
          //     page: 1,
          //     perPage: 10
          // });
          // console.log('list: ', getListLoans)
          // setDateTotable(getListLoans);
          // $("#modal-default-revenue-expense").modal('hide');
          // var typePagination = document.getElementById('type-pagination');
          // typePagination.innerHTML = 1;
        }
      } catch (error) {
        console.log("error: ", error);
        //errorLogin.textContent = 'Server bị lỗi!';
        return;
      }
    });
  }
  
  $(document).on("click", "#PaginationGeneral li", async function () {
    try {
      var paginateActive = $("#PaginationGeneral li.active");
      var buttonPrevious = $("#PaginationGeneral li#example2_previous");
      var totalPages = document.getElementById("total-pages").innerHTML.trim();
      var buttonNext = $("#PaginationGeneral li#example2_next");
      buttonPrevious[0].classList.remove("disabled");
      buttonNext[0].classList.remove("disabled");
      if (totalPages == 1) {
        console.log(1);
        buttonPrevious[0].classList.add("disabled");
        buttonNext[0].classList.add("disabled");
      }
      var isButtonNext = this.classList.contains("next");
      var isButtonPrevious = this.classList.contains("previous");
      var pageCurrent = Number(paginateActive[0].textContent.trim());
      let page = 1;
      if (isButtonNext) {
        if (pageCurrent == totalPages) {
          buttonNext[0].classList.add("disabled");
          return;
        }
        var nextActive = paginateActive.next();
        nextActive[0].classList.add("active");
        page = pageCurrent + 1;
        paginateActive[0].classList.remove("active");
      } else if (isButtonPrevious) {
        console.log("12312");
        if (pageCurrent == 1) {
          console.log(22222);
          buttonPrevious[0].classList.add("disabled");
          return;
        }
        var prevActive = paginateActive.prev();
        prevActive[0].classList.add("active");
        page = pageCurrent - 1;
        paginateActive[0].classList.remove("active");
      } else {
        if (this.textContent == paginateActive[0].textContent) {
          if (pageCurrent == 1) {
            buttonPrevious[0].classList.add("disabled");
          }
          if (pageCurrent == totalPages) {
            console.log("total pages");
            buttonNext[0].classList.add("disabled");
          }
          return;
        } else {
          paginateActive[0].classList.remove("active");
          this.classList.add("active");
          page = this.textContent.trim();
        }
      }
      if (page == 1) {
        buttonPrevious[0].classList.add("disabled");
      }
      if (page == totalPages) {
        buttonNext[0].classList.add("disabled");
      }
      var typePagination = document.getElementById("type-pagination").textContent;
      console.log("type pagination: ", typePagination.textContent);
      let getListRevenueExpense = {};
      if (typePagination == 1) {
        getListRevenueExpense = await handleGetListExpense({
          page: page,
          perPage: 10,
        });
      } else {
        var to_date = $('#reservation_to_date').find('input').val();
        var from_date = $('#reservation_from_date').find('input').val();
        const typeSelect = $("#type-revenue option:selected").text();
        const valueSelected = $("#type-revenue option:selected").val();
        const query = {
          page: page,
          perPage: 10,
          from_date: from_date,
          to_date: to_date,
          type: typeSelect,
        };
        if(valueSelected == 0)
          query.type = '';
        getListRevenueExpense = await handleFilterRevenue(query);
      }
  
      setTablePagination(getListRevenueExpense);
      if (getListRevenueExpense.Result.pages == page) {
        buttonNext[0].classList.add("disabled");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  });
  
  async function setTablePagination(getListRevenueExpense) {
    $("#body-revenue-expense").find("tr").remove();
    const data = getListRevenueExpense.Result.data;
    let htmlLi = "";
    data.forEach((item) => {
      htmlLi += `
              <tr class="odd">
              <td>${item.create_date}</td>
              <td>${item.receiver}</td>
              <td>${item.type}</td>
              <td>${item.note}</td>
              <td>${item.total}</td>
              <td>${item.create_by}</td>
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
    });
    $("html, body").animate(
      {
        scrollTop: $("#table-revenue-expense").offset().top,
      },
      1000
    );
    var tableRevenueExpense = document.getElementById("body-revenue-expense");
    tableRevenueExpense.innerHTML = htmlLi;
    var totalPagesAdd = document.getElementById("total-pages");
    totalPagesAdd.innerHTML = getListRevenueExpense.Result.pages;
  }
  
  async function setDateTotable(getListRevenueExpense) {
    $("#body-revenue-expense").find("tr").remove();
    const data = getListRevenueExpense.Result.data;
    const totalPages = getListRevenueExpense.Result.pages;
    let htmlLi = "";
    data.forEach((item) => {
      item.create_date;
      htmlLi += `
          <tr class="odd">
              <td>${item.create_date}</td>
              <td>${item.receiver}</td>
              <td>${item.type}</td>
              <td>${item.note}</td>
              <td>${item.total}</td>
              <td>${item.create_by}</td>
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
    });
    var tableRevenueExpense = document.getElementById("body-revenue-expense");
    var pagination = document.getElementById("PaginationGeneral");
    tableRevenueExpense.innerHTML = htmlLi;
    $("#PaginationGeneral li").remove();
    let stringPagination = "";
    stringPagination += `<li class="paginate_button page-item previous disabled" id="example2_previous" disabled>
      <a aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link" >
        Previous
      </a>
    </li>
    <li class="paginate_button page-item active">
      <a  aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">
        1
      </a>
    </li>`;
    for (let i = 2; i <= totalPages; i++) {
      stringPagination += `<li class="paginate_button page-item ">
          <a aria-controls="example2" data-dt-idx=${i} tabindex="0" class="page-link">${i}</a>
      </li>`;
    }
    if (totalPages == 1) {
      //console.log('1')
      stringPagination += ` <li class="paginate_button page-item next disabled" id="example2_next" disabled>
              <a aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
          </li>`;
    } else {
      // console.log('2')
      stringPagination += ` <li class="paginate_button page-item next" id="example2_next">
          <a  aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a>
          </li>`;
    }
  
    pagination.innerHTML = stringPagination;
    var totalPagesAdd = document.getElementById("total-pages");
    totalPagesAdd.innerHTML = totalPages;
    totalRevenueExpense.textContent = getListRevenueExpense.Result.total;
  
    $("html, body").animate(
      {
        scrollTop: $("#table-revenue-expense").offset().top,
      },
      1000
    );
  }
  