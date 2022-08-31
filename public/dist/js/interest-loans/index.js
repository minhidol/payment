import {
    handleCreateRevenue,
    handleGetListRevenue,
    handleFilterRevenue,
  } from "/dist/js/api/revenueApi.js";
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
    // skip for arrow keys
    if(event.which >= 37 && event.which <= 40) return;
    // format number
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
    const formField = input.parentElement;
    input.classList.remove("success");
    input.classList.add("error");
    const error = formField.querySelector("small");
    error.textContent = message;
  };
  const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove("error");
    input.classList.add("success");
    const error = formField.querySelector("small");
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
    } else {
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
    } else {
      showSuccess(inputProfitTime);
      valid = true;
    }
    return valid;
  };
  const checkProfitPeriod = () => {
    let valid = false;
    const profitPeriodValid = inputProfitPeriod.value.trim();
    if (!isRequired(profitTimeValid)) {
      showError(inputProfitPeriod, "Kỳ lãi không được bỏ trống.");
    } else {
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
    } else {
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

        let isFormValid = isNameValid && isValidNumberPhone && isCheckTotal && isCheckProfitTime && isProfitPeriod && isCheckInterest;
        if (isFormValid) {
          alert('Done')
          // const data = {
          //   receiver: receiver.value,
          //   type: $("#ChooseRevenue option:selected").text(),
          //   total: total.value,
          //   note: note.value,
          // };
          //  await handleCreateRevenue(data);
          // const getListExpense = await handleGetListRevenue({
          //     page: 1,
          //     perPage: 10
          // });
          // console.log('list: ', getListExpense)
          // setDateTotable(getListExpense);
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
  