import {
  handleCreateInterestLoans,
  handleFilterInterestLoans ,
  handleGetListInterestLoansByUsername,
  handleGetInterestLoansById,
  handleUpdateInterest,
  handleUpdatePayDebt
  } from "/dist/js/api/interestLoansApi.js";
  import {
    stringToDate,
    stringToDateTime,
    compareTwoDate,
    compareTwoDateEqual
    } from "/dist/js/helpers/extra_function.js";
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
const formPayDownThePrincipal = document.querySelector("#pay_down_the_principal");

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
 
  $('#txtTragoc_TotalMoney').keyup(function(event) {
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

  
  formPayDownThePrincipal.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      var datePayString = $('#reservation_interest_payment').find('input').val();

      var _id = $('#input-check-interest').attr("id_interest");
      var money =  $('#txtTragoc_TotalMoney').val();
      $('#error-date-tragoc').hide();
      if(!isRequired(money)){
        $('#error-date-tragoc small').html('Số tiền không được để trống');
        $('#error-date-tragoc').show();
        return;
      }
      const data = {
        id: _id,
        datePay: datePayString,
        moneyPay: $('#txtTragoc_TotalMoney').val()
      };
      const updateDebt = await handleUpdatePayDebt(data);
      if(updateDebt.ErrorCode != 0){
        $('#error-date-tragoc small').html(updateDebt.Message);
        $('#error-date-tragoc').show();
        return;
      }
      alert('Trả bớt gốc thành công!');
      const res = updateDebt.Result;
      console.log('data: ', {data, updateDebt});
      $('#lblTotalMoney').html(res.total);
      
      // var check = datePay >= fromDate && datePay <= toDate;
      // if(check)
      //   $('#error-date-tragoc').hide();
      // else{
      //   $('#error-date-tragoc small').html('Ngày trả gốc phải lớn hơn ngày bắt đầu và nhỏ hơn ngày kết thúc của khoản vay');
      //   $('#error-date-tragoc').show();
      // }
        
    } catch (error) {
      console.log("error: ", error);
      //errorLogin.textContent = 'Server bị lỗi!';
      return;
    }
  });

  formSearchRevenueExpense.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      alert('Chức năng chưa thực hiện')
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
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}
function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
            status: 'Đang vay',
            create_date: $('#reservation_interest').find('input').val()
          };
          if(profitForm.includes('k/'))
            data.currency_unit = 'k'
          else 
            data.currency_unit = '%'
          if(profitForm.includes('tháng')){
            data.time_unit = 'tháng';
            var inputDateCreatedString = $('#reservation_interest').find('input').val();
            const [day, month, year] = inputDateCreatedString.split('/');
            let fromDate = new Date(+year, month - 1, + day);
            const toDate = new Date(+year, month - 1, + day);
            new Date(toDate.setMonth(toDate.getMonth() + parseInt(inputProfitTime.value)));
            data.number_of_days_loans = days(toDate, fromDate);
            let period = parseInt(inputProfitTime.value/inputProfitPeriod.value);
            const surplus = inputProfitTime.value%inputProfitPeriod.value;
            if(surplus > 0)
              period++;
            const periodLoansArray = [];
            let toDatePeriod = new Date(+year, month - 1, + day);
            new Date(toDatePeriod.setMonth(toDatePeriod.getMonth() + parseInt(inputProfitPeriod.value)));
            let numberTotal = parseFloat(inputTotal.value.replaceAll('.',''));
            //console.log('number total: ', {numberTotal, value:inputTotal.value})
            let moneyInterestMonth =  parseInt(numberTotal*inputInterest.value/100);
            periodLoansArray.push({fromDate: formatDate(fromDate), toDate: formatDate(toDatePeriod), 
              number_of_days_loans: days(toDatePeriod, fromDate), is_paid_interest: 0, 
              money_interest: numberWithCommas(parseInt(moneyInterestMonth*InputProfitPeriod.value))});
            for(let i = 1; i < period; i++){
              fromDate = toDatePeriod;
              const temp = {
                fromDate: new Date(fromDate)
              };
              let tempToDate = toDatePeriod;
              toDatePeriod = new Date(tempToDate.setMonth(tempToDate.getMonth() + parseInt(inputProfitPeriod.value)));
              temp.toDate = toDatePeriod;
              let moneyInterest = parseInt(moneyInterestMonth*InputProfitPeriod.value);
              // console.log({moneyInterestMonth, period: InputProfitPeriod.value})
              if(toDatePeriod > toDate){
                temp.toDate = toDate;
                moneyInterest = parseInt(moneyInterestMonth*getMonthDifference(temp.fromDate, temp.toDate));
              }
              temp.number_of_days_loans = days(temp.toDate, temp.fromDate);
              const tempResult = {
                fromDate: formatDate(temp.fromDate),
                toDate: formatDate(temp.toDate),
                number_of_days_loans: temp.number_of_days_loans,
                is_paid_interest: 0,
                money_interest: numberWithCommas(moneyInterest)
              }
              periodLoansArray.push(tempResult);
            }
            data.list_history_payment_interest = periodLoansArray;
          }
          else if(profitForm.includes('ngày')){
            data.time_unit = 'ngày';
            data.number_of_days_loans = inputProfitTime.value;
            var inputDateCreatedString = $('#reservation_interest').find('input').val();
            const [day, month, year] = inputDateCreatedString.split('/');
            let fromDate = new Date(+year, month - 1, + day);
            const toDate = new Date(+year, month - 1, + day);
            new Date(toDate.setDate(toDate.getDate() + parseInt(inputProfitTime.value)));
            let period = parseInt(inputProfitTime.value/inputProfitPeriod.value);
            const surplus = inputProfitTime.value%inputProfitPeriod.value;
            if(surplus > 0)
              period++;
            let moneyInterestDay =  parseInt(inputInterest.value.replaceAll('.',''))*1000;
            const periodLoansArray = [];
            let toDatePeriod = new Date(+year, month - 1, + day);
            new Date(toDatePeriod.setDate(toDatePeriod.getDate() + parseInt(inputProfitPeriod.value)));
            periodLoansArray.push({fromDate: formatDate(fromDate), toDate: formatDate(toDatePeriod), 
              number_of_days_loans: days(toDatePeriod, fromDate), is_paid_interest: 0,
              money_interest: numberWithCommas(parseInt(moneyInterestDay*InputProfitPeriod.value))
            });
            for(let i = 1; i < period; i++){
              fromDate = toDatePeriod;
              const temp = {
                fromDate: new Date(fromDate)
              };
              let tempToDate = toDatePeriod;
              toDatePeriod = new Date(tempToDate.setDate(tempToDate.getDate() + parseInt(inputProfitPeriod.value)));
              temp.toDate = toDatePeriod;
              let moneyInterest = parseInt(moneyInterestDay*InputProfitPeriod.value);
              if(toDatePeriod > toDate){
                temp.toDate = toDate;
                moneyInterest = parseInt(moneyInterestDay*days(temp.toDate, temp.fromDate));
              }
              temp.number_of_days_loans = days(temp.toDate, temp.fromDate);
              const tempResult = {
                fromDate: formatDate(temp.fromDate),
                toDate: formatDate(temp.toDate),
                number_of_days_loans: temp.number_of_days_loans,
                is_paid_interest: 0,
                money_interest: numberWithCommas(moneyInterest)
              }
              periodLoansArray.push(tempResult);
            }
            data.list_history_payment_interest = periodLoansArray;
          }            
          else{
            data.time_unit = 'tuần';
            data.number_of_days_loans = inputProfitTime.value*7;
            var inputDateCreatedString = $('#reservation_interest').find('input').val();
            const [day, month, year] = inputDateCreatedString.split('/');
            let fromDate = new Date(+year, month - 1, + day);
            const toDate = new Date(+year, month - 1, + day);
            new Date(toDate.setDate(toDate.getDate() + parseInt(inputProfitTime.value*7)));
            let period = parseInt(inputProfitTime.value/inputProfitPeriod.value);
            const surplus = inputProfitTime.value%inputProfitPeriod.value;
            if(surplus > 0)
              period++;
            const periodLoansArray = [];
            let toDatePeriod = new Date(+year, month - 1, + day);
            new Date(toDatePeriod.setDate(toDatePeriod.getDate() + parseInt(inputProfitPeriod.value*7)));
            let numberTotal = parseFloat(inputTotal.value.replaceAll('.',''));
            let moneyInterestWeek;
            if(profitForm.includes('k/'))
              moneyInterestWeek =  parseInt(inputInterest.value.replaceAll('.',''))*1000;
            else 
              moneyInterestWeek =  parseInt(numberTotal*inputInterest.value/100);
              periodLoansArray.push({fromDate: formatDate(fromDate), toDate: formatDate(toDatePeriod), 
              number_of_days_loans: days(toDatePeriod, fromDate), is_paid_interest: 0,
              money_interest: numberWithCommas(parseInt(moneyInterestWeek*InputProfitPeriod.value))});
            for(let i = 1; i < period; i++){
              fromDate = toDatePeriod;
              const temp = {
                fromDate: new Date(fromDate)
              };
              let tempToDate = toDatePeriod;
              toDatePeriod = new Date(tempToDate.setDate(tempToDate.getDate() + parseInt(inputProfitPeriod.value*7)));
              temp.toDate = toDatePeriod;
              let moneyInterest = parseInt(moneyInterestWeek*InputProfitPeriod.value);
              if(toDatePeriod > toDate){
                temp.toDate = toDate;
                moneyInterest = parseInt(moneyInterestWeek*(days(temp.toDate, temp.fromDate)/7));
              }
              temp.number_of_days_loans = days(temp.toDate, temp.fromDate);
              const tempResult = {
                fromDate: formatDate(temp.fromDate),
                toDate: formatDate(temp.toDate),
                number_of_days_loans: temp.number_of_days_loans,
                is_paid_interest: 0,
                money_interest: numberWithCommas(moneyInterest)
              }
              periodLoansArray.push(tempResult);
            }
            data.list_history_payment_interest = periodLoansArray;
          }
          await handleCreateInterestLoans(data);
          const getListLoans = await handleGetListInterestLoansByUsername({
              page: 1,
              perPage: 10
          });
          console.log('list: ', getListLoans)
          setDateTotable(getListLoans);
          $("#modal-default-revenue-expense").modal('hide');
          var typePagination = document.getElementById('type-pagination');
          typePagination.innerHTML = 1;
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
 // tabdonglai
  $(document).on("click", "#lblTitleTabDongLai", async function () {
    try {
      var _id = $('#i-id-interest-loans').text();
      console.log('id: ', _id);
      const interestLoan = await handleGetInterestLoansById(_id);
      console.log('id: ', interestLoan);
      const data = interestLoan.Result;
      const listInterest = data.list_history_payment_interest;
      const toDate = listInterest[listInterest.length-1].toDate;
      let sumInterest = 0;
      for(let i = 0; i < listInterest.length; i++){
        sumInterest += parseInt(listInterest[i].money_interest.replaceAll('.',''));
      }
      //console.log({rate: data.interest+data.currency_unit+' /' + time_unit});
      $('span#lblCusName').html(data.name);
      $('i#telephone-customer').html(data.number_phone);
      $('span#lblTotalMoney').html(data.total);
      $('span#lblStrRate').html(data.interest+data.currency_unit+' /' + data.time_unit);
      $('span#lblFromDate').html(data.create_date);
      $('span#lblToDate').html(toDate);
      $('span#lblTotalInterest').html(numberWithCommas(sumInterest));
      $("#lblPaymentMoney").html(data.the_amount_paid);
      $("#table-profits").find("tr").remove();
      let htmlCol = "";
      let count = 0;
      listInterest.forEach((item) => { 
        count++;
        htmlCol += `
        <tr>
        <td align="center" class="align-middle">${count}</td>
        <td align="center" class="align-middle">${item.fromDate}</td>
        <td align="center" class="align-middle">
          <i class="fa fa-arrow-right"></i></td>
        <td align="center" class="align-middle">
          ${item.toDate}
        </td>       
        <td align="center" class="align-middle">${item.toDate}</td>
        <td align="right" class="align-middle">${item.money_interest} VNĐ</td>
        <td align="right" class="align-middle">0 VNĐ</td>
        <td align="right" class="align-middle">${item.money_interest} VNĐ</td>
        <td align="right" class="align-middle">
          <input type="text" style="text-align:right;color:Red;font-size:14px" 
          class="form-control form-control-sm m-input m-input--pill " id="txtPaymoney_89197732" 
          value="${item.money_interest}" disabled>
        </td>                                                           
        <td align="center" class="align-middle">
          <label class="m-checkbox m-checkbox--bold m-checkbox--state-success">  
            <input type="checkbox" title="Bỏ tích để hủy đóng lãi" id="input-check-interest" 
            class="ckClickPayment" from_date=${item.fromDate} to_date=${item.toDate}
            id_interest=${_id}`+
            (item.is_paid_interest == 1 ? ' checked' : ' ')+`
            money_paid="${item.money_interest}"> 
              <span style="margin-top:-6px"></span>
          </label>
        </td>
      </tr> `;
        });
      var tableProfits = document.getElementById("table-profits");
      tableProfits.innerHTML = htmlCol;
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
  // load table
  async function setDateTotable(listLoans) {
    $("#body-revenue-expense").find("tr").remove();
    const data = listLoans.Result.data;
    let theLastPeriodPayment;
    for(let i = 0; i < data.length; i++){
      let totalProfitToDate = 0;
      let dateProfitToDate = 0;
      const listHistoryPaymentInterest = data[i].list_history_payment_interest;
      let count = 0;
      for(let j = listHistoryPaymentInterest.length - 1; j >= 0; j--){
        if(listHistoryPaymentInterest[j].is_paid_interest == 0){
          const dateNow = formatDate(new Date());
          console.log(listHistoryPaymentInterest[j])
          if(compareTwoDate(dateNow, listHistoryPaymentInterest[j].toDate)){
            data.StatusInterest = 'Đang vay'
          }else{
            data.StatusInterest = 'Quá hạn'
          }
          if(compareTwoDateEqual(dateNow, listHistoryPaymentInterest[j].toDate)){
            data.StatusInterest = 'Hôm nay đóng lãi'
          }
      }
      }
      for(let j = 0; j < listHistoryPaymentInterest.length; j++){
        const nowDate = new Date().getTime();
        const [day, month, year] = listHistoryPaymentInterest[j].fromDate.split('/');
        const [dayTo, monthTo, yearTo] = listHistoryPaymentInterest[j].toDate.split('/');
        let fromDate = new Date(+year, month - 1, + day).getTime();
        let toDate = new Date(+yearTo, monthTo - 1, + dayTo).getTime();
        var check = nowDate >= fromDate && nowDate <= toDate;
        let numberConvert = parseFloat(listHistoryPaymentInterest[j].money_interest.replaceAll('.',''));
        count++;
        if(listHistoryPaymentInterest[j].is_paid_interest == 0){
          totalProfitToDate += parseInt(numberConvert);
          dateProfitToDate += listHistoryPaymentInterest[j].number_of_days_loans;
        }
        if(count == 1 && check){
          dateProfitToDate = days(new Date(nowDate), new Date(fromDate));
          totalProfitToDate = parseInt(parseFloat(numberConvert/listHistoryPaymentInterest[j].number_of_days_loans).toFixed(3)*dateProfitToDate);
          console.log({dateProfitToDate, totalProfitToDate, dateProfitToDate});
          data[i].date_profit_to_date = dateProfitToDate;
          data[i].total_profit_to_date = numberWithCommas(totalProfitToDate);
          break;
        }
        else if(check && listHistoryPaymentInterest[j].is_paid_interest == 0){
          const numberDay = days(new Date(nowDate), new Date(fromDate));
          dateProfitToDate += numberDay;
          totalProfitToDate += parseInt(parseFloat(numberConvert/listHistoryPaymentInterest[j].number_of_days_loans).toFixed(3)*dateProfitToDate);
          data[i].date_profit_to_date = dateProfitToDate;
          data[i].total_profit_to_date = numberWithCommas(totalProfitToDate);
          break;
        }else if(check && listHistoryPaymentInterest[j].is_paid_interest == 1){
          data[i].status = 'Đang vay';
          break;
        }
      }
      for(let j = 0; j < listHistoryPaymentInterest.length; j++){
        if(listHistoryPaymentInterest[j].is_paid_interest == 0){
          data[i].interest_payment_date = listHistoryPaymentInterest[j].toDate;
          break;
        }
      }
    } 
    const totalPages = listLoans.Result.pages;
    let htmlLi = "";
    data.forEach((item) => {
      item.create_date;
      htmlLi += `
          <tr class="odd">
              <td>${item.name}
                <span style="display: inline-block;">
                  <i class="fas fa-phone">
                  </i>
                  ${item.number_phone}
                </span>
              </td>
              <td>${item.collateral}</td>
              <td>${item.total}
                <span style="display: inline-block;font-size: 14px;color: brown;">
                  ${item.interest}${item.currency_unit} /${item.time_unit}
                </span>
              </td>
              <td>${item.create_date}
                <span style="display: inline-block;font-size: 14px;color: #909090;">
                (${item.number_of_days_loans} ngày)
                </span>
              </td>
              <td>${item.the_amount_paid}</td>
              <td>${item.old_debt}</td>
              <td>${item.total_profit_to_date}
                <span style="display: inline-block;font-size: 14px;color: #909090;">
                (${item.date_profit_to_date} ngày)
                </span>
              </td>
              <td>${item.interest_payment_date}</td>
              `+( data.StatusInterest == 'Đang vay' ?`<td style="color: #36a3f7">${item.status}</td>` : 
              `<td style="color: #36a3f7">${item.status}</td>`)
              +`
              
              <td class="project-actions text-center" style="align-items: center;">
              <button
                id='pay-interest'
                data-toggle="modal" data-target="#modal-details_pawn" 
                class="btn btn-secondary btn-sm" title="Đóng lãi">							                    
                  <i class="fas fa-coins" style="color: #ffbf00"></i>
                  <span id='id-interest' style="display:none">${item._id}</span>						                    
              </button>
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
    totalRevenueExpense.textContent = listLoans.Result.total;
  
    $("html, body").animate(
      {
        scrollTop: $("#table-revenue-expense").offset().top,
      },
      1000
    );
  }
  // load page
  $( document ).ready(async function() {
    const getListLoans = await handleGetListInterestLoansByUsername({
      page: 1,
      perPage: 100
    });
    console.log('list loans: ', getListLoans);
    setDateTotable(getListLoans);
    $("#modal-default-revenue-expense").modal('hide');
    var typePagination = document.getElementById('type-pagination');
    typePagination.innerHTML = 1;
});

$(document).on("click", "table#table-revenue-expense td button#pay-interest", async function (e) {
  // $('#dong_tien_lai').addClass('active');
  // $('#m_tab_donglai').addClass('active');
  var _id = $(this).find('span#id-interest').text();
  const interestLoan = await handleGetInterestLoansById(_id);
  const data = interestLoan.Result;
  const listInterest = data.list_history_payment_interest;
  const toDate = listInterest[listInterest.length-1].toDate;
  let sumInterest = 0;
  for(let i = 0; i < listInterest.length; i++){
    sumInterest += parseInt(listInterest[i].money_interest.replaceAll('.',''));
  }
  //console.log({rate: data.interest+data.currency_unit+' /' + time_unit});
  $('i#i-id-interest-loans').html(_id);
  $('span#lblCusName').html(data.name);
  $('i#telephone-customer').html(data.number_phone);
  $('span#lblTotalMoney').html(data.total);
  $('span#lblStrRate').html(data.interest+data.currency_unit+' /' + data.time_unit);
  $('span#lblFromDate').html(data.create_date);
  $('span#lblToDate').html(toDate);
  $('span#lblTotalInterest').html(numberWithCommas(sumInterest));
  $("#lblPaymentMoney").html(data.the_amount_paid);
  $("#table-profits").find("tr").remove();
  
  let htmlCol = "";
  let count = 0;
  listInterest.forEach((item) => { 
    count++;
    htmlCol += `
    <tr>
    <td align="center" class="align-middle">${count}</td>
    <td align="center" class="align-middle">${item.fromDate}</td>
    <td align="center" class="align-middle">
      <i class="fa fa-arrow-right"></i></td>
    <td align="center" class="align-middle">
      ${item.toDate}
    </td>       
    <td align="center" class="align-middle">${item.toDate}</td>
    <td align="right" class="align-middle">${item.money_interest} VNĐ</td>
    <td align="right" class="align-middle">0 VNĐ</td>
    <td align="right" class="align-middle">${item.money_interest} VNĐ</td>
    <td align="right" class="align-middle">
      <input type="text" style="text-align:right;color:Red;font-size:14px" 
      class="form-control form-control-sm m-input m-input--pill " id="txtPaymoney_89197732" 
      value="${item.money_interest}" disabled>
    </td>                                                           
    <td align="center" class="align-middle">
      <label class="m-checkbox m-checkbox--bold m-checkbox--state-success">  
        <input type="checkbox" title="Bỏ tích để hủy đóng lãi" id="input-check-interest" 
        class="ckClickPayment" from_date=${item.fromDate} to_date=${item.toDate}
        id_interest=${_id}`+
        (item.is_paid_interest == 1 ? ' checked' : ' ')+`
        money_paid="${item.money_interest}"> 
          <span style="margin-top:-6px"></span>
      </label>
    </td>
  </tr> `;
    });
    var tableProfits = document.getElementById("table-profits");
    tableProfits.innerHTML = htmlCol;
})

$(document).on("click", "tbody#table-profits td input#input-check-interest", async function (e) {
  var fromDate =  e.currentTarget.getAttribute('from_date');
  var toDate =  e.currentTarget.getAttribute('to_date');
  var _id =  e.currentTarget.getAttribute('id_interest');
  var moneyPaid =  e.currentTarget.getAttribute('money_paid');
  var tempMoney = $("#lblPaymentMoney").text();
  let totalMoney = 0;
 
  if($(this).is(":checked")) {
    totalMoney = parseInt(moneyPaid.replaceAll('.','')) + parseInt(tempMoney.replaceAll('.',''));
  }else{
    totalMoney = parseInt(tempMoney.replaceAll('.','')) - parseInt(moneyPaid.replaceAll('.',''));
  }
  $("#lblPaymentMoney").html(numberWithCommas(totalMoney));
  const updateInterest = await handleUpdateInterest({
    fromDate: fromDate,
    toDate: toDate,
    id: _id,
  })
  console.log({updateInterest});
})
