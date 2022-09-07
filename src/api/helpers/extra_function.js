exports.numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

exports.stringToDate = (x) => {
    const [day, month, year] = x.split('/');
    return new Date(+year, month - 1, + day).getTime();
}

exports.stringToDateTime = (x) => {
    const [day, month, year] = x.split('/');
    return new Date(+year, month - 1, + day);
}

exports.compareTwoDate = (x, y) => {
    const date1 = this.stringToDate(x);
    const date2 = this.stringToDate(y);
    if(date1 < date2)
        return true
    else false
}

exports.getMonthDifference = (startDate, endDate) => {
    const startTypeDate = this.stringToDateTime(startDate);
    const endTypeDate = this.stringToDateTime(endDate);
    return (
        endTypeDate.getMonth() -
      startTypeDate.getMonth() +
      12 * (endTypeDate.getFullYear() - startTypeDate.getFullYear())
    );
  }
// exports.