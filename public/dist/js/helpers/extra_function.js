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
    console.log({x,y})
    const date1 = stringToDate(x);
    const date2 = stringToDate(y);
    if(date1 < date2)
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
const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  export{
    compareTwoDate,
    stringToDateTime,
    stringToDate,
    compareTwoDateEqual
}
 