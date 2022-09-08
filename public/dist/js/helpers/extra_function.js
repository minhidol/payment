const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const stringToDate = (x) => {
    const [day, month, year] = x.split('/');
    return new Date(+year, month - 1, + day).getTime();
}

const stringToDateTime = (x) => {
    const [day, month, year] = x.split('/');
    return new Date(+year, month - 1, + day);
}

const compareTwoDate = (x, y) => {
    const date1 = stringToDate(x);
    const date2 = stringToDate(y);
    if(date1 < date2)
        return true
    else false
}

const compareTwoDateLessEqual = (x, y) => {
    const date1 = stringToDate(x);
    const date2 = stringToDate(y);
    if(date1 <= date2)
        return true
    else false
}

const compareTwoDateGreaterEqual = (x, y) => {
    const date1 = stringToDate(x);
    const date2 = stringToDate(y);
    if(date1 >= date2)
        return true
    else false
}

const compareTwoDateEqual = (x, y) => {
    const date1 = stringToDate(x);
    const date2 = stringToDate(y);
    if(date1 == date2)
        return true
    else false
}
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }
const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

const addDayToDate = (startDate, days) => {
    startDate = stringToDateTime(startDate);
    startDate.setDate(startDate.getDate() + parseInt(days));
    return formatDate(startDate);
}

const getDays = (date_1, date_2) => {
    date_1 = stringToDateTime(date_1);
    date_2 = stringToDateTime(date_2);
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays + 1;
}


  export{
    compareTwoDate,
    stringToDateTime,
    stringToDate,
    compareTwoDateEqual,
    addDayToDate,
    getDays,
    compareTwoDateLessEqual,
    compareTwoDateGreaterEqual
}
 