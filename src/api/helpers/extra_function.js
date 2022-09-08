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

exports.getDays = (date_1, date_2) => {
    date_1 = this.stringToDateTime(date_1);
    date_2 = this.stringToDateTime(date_2);
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
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

  exports.padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

exports.formatDate = (date) => {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

exports.addDayToDate = (startDate, days) => {
    startDate = this.stringToDateTime(startDate);
    startDate.setDate(startDate.getDate() + parseInt(days));
    return this.formatDate(startDate);
}
// exports.