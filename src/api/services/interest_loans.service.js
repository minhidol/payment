var interestLoansModel = require('../models/interest_loans.model');
var constants = require('../../constants/constants');
var {numberWithCommas, compareTwoDate, 
    getMonthDifference, stringToDate, stringToDateTime, getDays,
    addDayToDate
} = require('../helpers/extra_function');
var moment = require('moment');

const getListInterestLoansByUsername = async(query) => {
    try{
        const listInterestLoans = await interestLoansModel.paginate({
            create_by: query.username,
            is_delete: constants.NOT_DELETED
        },{
            page: query.page,
            perPage: query.perPage,
            lean: true,
            sort: { create_date: -1 }
        });
        const result = {
            page: listInterestLoans.page,
            pages: listInterestLoans.pages,
            total: listInterestLoans.documents,
            data: listInterestLoans.data
        }
        return result;
    }catch(error){
        throw error;
    }
}

const getInterestLoansByIdUsername = async(query) => {
    try{
        console.log('query:', query)
        const interestLoans = await interestLoansModel.findOne({
            _id: query.id,
            create_by: query.username,
            is_delete: constants.NOT_DELETED
        });
       
        return interestLoans;
    }catch(error){
        throw error;
    }
}

const updateInterestPayment = async(data) => {
    try{
        let loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        const listPayment = loans.list_history_payment_interest;
        let totalPaid = parseInt(loans.the_amount_paid.replaceAll('.',''));
        let checkError = '';
        for(let i = 0; i < listPayment.length; i++){
            if(listPayment[i].fromDate == data.fromDate && listPayment[i].toDate == data.toDate){
                if(listPayment[i].is_paid_interest == 1){
                    if(i == listPayment.length-1){
                        totalPaid -= parseInt(listPayment[i].money_interest.replaceAll('.',''));
                        listPayment[i].is_paid_interest = 0;
                        break;
                    }
                    if(listPayment[i+1].is_paid_interest == 1){
                        checkError = 'Bạn phải xóa đóng lãi sau';
                        break;
                    }
                    totalPaid -= parseInt(listPayment[i].money_interest.replaceAll('.',''));
                    listPayment[i].is_paid_interest = 0;
                }else{
                    for(let j = 0; j <= i; j++){
                        if(listPayment[j].is_paid_interest == 0){
                            totalPaid += parseInt(listPayment[j].money_interest.replaceAll('.',''));
                            listPayment[j].is_paid_interest = 1;
                        }
                    }
                }
            }
        }
        console.log({checkError,listPayment});
        if(checkError != ''){
            return {error: 1, message: checkError};
        }
        const interestLoans = await interestLoansModel.findOneAndUpdate({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
            'list_history_payment_interest.fromDate': data.fromDate,
            'list_history_payment_interest.toDate': data.toDate,
        }
        ,{
            the_amount_paid: numberWithCommas(totalPaid),
            list_history_payment_interest: listPayment
        }, {new: true}).lean();
        loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        loans.error = 0;
        return loans;
    }catch(error){
        throw error;
    }
}

const updatePayUpDebt = async(data) => {
    try {
        let loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        const listPayment = loans.list_history_payment_interest;
        let total = parseInt(loans.total.replaceAll('.',''));
        let checkDate = '';
        const timeUnit = loans.time_unit;
        const rateInterest = loans.interest;
        const currentUnit = loans.currency_unit;
        const deadlineInterest = loans.deadline_loans;
        for(let i = listPayment.length - 1; i >= 0; i--){
            if(listPayment[i].is_paid_interest == 1){
                if(compareTwoDate(data.datePay, listPayment[i].toDate)){
                    checkDate = listPayment[i].toDate
                }
                break;
            }
        }
        if(checkDate != ''){
            return {
                error: 1,
                checkDate: checkDate
            };
        }
        let totalRest = total + parseInt(data.moneyPay.replaceAll('.',''));
        console.log('total rest: ', {totalRest, currentUnit, rateInterest});
        let arr_list_payment = [];
        if(currentUnit == '%'){
            let moneyInterestMonth =  parseInt(totalRest*rateInterest/100);
            let moneyInterest = moneyInterestMonth*deadlineInterest;
            console.log({total, totalRest, moneyInterestMonth, moneyInterest})
            listPayment.forEach(item => {
                if(item.is_paid_interest == 0){
                    if(timeUnit == 'tháng'){
                        tempMonth = getDays(item.toDate, item.fromDate)/30;
                    }else{
                        tempMonth = getDays(item.toDate, item.fromDate)/7;
                    }
                    if(deadlineInterest != tempMonth){
                        item.money_interest = numberWithCommas(moneyInterestMonth*tempMonth);
                    }else{
                        item.money_interest = numberWithCommas(moneyInterest);
                    }
                }
                arr_list_payment.push(item);
            });
            resultUpdate = await interestLoansModel.findOneAndUpdate({
                _id: data.id,
                create_by: data.username,
                is_delete: constants.NOT_DELETED
            },{
                total: numberWithCommas(totalRest),
                list_history_payment_interest: arr_list_payment,
                update_date: moment(new Date()).format("DD/MM/YYYY"),
                update_by: data.username
            });
        };
        resultUpdate = await interestLoansModel.findOneAndUpdate({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED
        },{
            total: numberWithCommas(totalRest),
            update_date: moment(new Date()).format("DD/MM/YYYY"),
            update_by: data.username
        });
        loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        loans.error = 0;
        return loans;
    } catch (error) {
        throw error;
    }
}

const updatePayOffDebt = async(data) => {
    try{
        let loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        const listPayment = loans.list_history_payment_interest;
        let total = parseInt(loans.total.replaceAll('.',''));
        let checkDate = '';
        const rateInterest = loans.interest;
        const currentUnit = loans.currency_unit;
        const deadlineInterest = loans.deadline_loans;
        const timeUnit = loans.time_unit;
        for(let i = listPayment.length - 1; i >= 0; i--){
            if(listPayment[i].is_paid_interest == 1){
                if(compareTwoDate(data.datePay, listPayment[i].toDate)){
                    checkDate = listPayment[i].toDate
                }
                break;
            }
        }
        if(checkDate != ''){
            return {
                error: 1,
                checkDate: checkDate
            };
        }
        let totalRest = total - parseInt(data.moneyPay.replaceAll('.',''));
        let arr_list_payment = [];
        if(currentUnit == '%'){
            let moneyInterestMonth =  parseInt(totalRest*rateInterest/100);
            let moneyInterest = moneyInterestMonth*deadlineInterest;
            console.log({total, totalRest, moneyInterestMonth, moneyInterest})
            listPayment.forEach(item => {
                if(item.is_paid_interest == 0){
                    let tempMonth;
                    if(timeUnit == 'tháng'){
                        tempMonth = getDays(item.toDate, item.fromDate)/30;
                    }else{
                        tempMonth = getDays(item.toDate, item.fromDate)/7;
                    }
                    console.log('temp month: ', tempMonth)
                    if(deadlineInterest != tempMonth){
                        item.money_interest = numberWithCommas(moneyInterestMonth*tempMonth);
                    }else{
                        item.money_interest = numberWithCommas(moneyInterest);
                    }
                }
                arr_list_payment.push(item);
            });
            resultUpdate = await interestLoansModel.findOneAndUpdate({
                _id: data.id,
                create_by: data.username,
                is_delete: constants.NOT_DELETED
            },{
                total: numberWithCommas(totalRest),
                list_history_payment_interest: arr_list_payment,
                update_date: moment(new Date()).format("DD/MM/YYYY"),
                update_by: data.username
            });
        };
        resultUpdate = await interestLoansModel.findOneAndUpdate({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED
        },{
            total: numberWithCommas(totalRest),
            update_date: moment(new Date()).format("DD/MM/YYYY"),
            update_by: data.username
        });
        loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        loans.error = 0;
        return loans;
    }catch(error){
        throw error;
    }
}

const updateLoansExtension = async(data) => {
    try{
        let loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        const listPayment = loans.list_history_payment_interest;
        const finalRevenue = listPayment[listPayment.length - 1];
        
        const timeUnit = loans.time_unit;
        const rateInterest = loans.interest;
        const totalNumber = loans.total;
        const currencyUnit = loans.currency_unit;
        const numberOfDayLoans = loans.number_of_days_loans;
        const deadlineLoans = loans.deadline_loans;
        let numberOfDayLoansUpdate = 0;
        const periodLoansArray = [];
        let numberOfLoan = 0;
        // updated
        numberOfDayLoansUpdate = (timeUnit == 'ngày' ? numberOfDayLoans + parseInt(data.timeExtension) :
        (timeUnit == 'tuần' ? numberOfDayLoans + parseInt(data.timeExtension)*7 :
        (timeUnit == 'tháng' ? numberOfDayLoans + parseInt(data.timeExtension)*30 : 0))
        );
        numberOfDayLoans + data.timeExtension;
        //
        let fromDate = addDayToDate(finalRevenue.toDate, 1);
        let toDate = addDayToDate(finalRevenue.toDate, 1);
        for(let i = 0; i < listPayment.length ; i++){
            if(listPayment[i].is_paid_interest == 0){
                fromDate = listPayment[i].fromDate;
                //toDate = listPayment[i].toDate;
                break;
            }else{
                 periodLoansArray.push(listPayment[i]);
            }
        }
        
        let dateNewFinal = (timeUnit == 'ngày' ? addDayToDate(toDate, data.timeExtension - 1) :
           (timeUnit == 'tuần' ? addDayToDate(toDate, data.timeExtension*7 - 1) :
           (timeUnit == 'tháng' ? addDayToDate(toDate, data.timeExtension*30 - 1)  : 0))
           );
        let getProfitTime = getDays(dateNewFinal, fromDate);
        console.log({fromDate, toDate, dateNewFinal, getProfitTime});
        let period = (timeUnit == 'ngày' ? parseInt(getProfitTime/deadlineLoans) :
        (timeUnit == 'tuần' ? parseInt((getProfitTime/7)/deadlineLoans) :
        (timeUnit == 'tháng' ? parseInt((getProfitTime/30)/deadlineLoans) : 0))
        );

        const surplus =  (timeUnit == 'ngày' ? parseInt(getProfitTime%deadlineLoans) :
        (timeUnit == 'tuần' ? parseInt((getProfitTime/7)%deadlineLoans) :
        (timeUnit == 'tháng' ? parseInt((getProfitTime/30)%deadlineLoans) : 0))
        );
        getProfitTime%deadlineLoans;
        if(surplus > 0)
            period++;
        let moneyInterestDay = 0;
        if(currencyUnit == 'k'){
            moneyInterestDay =  parseInt(rateInterest)*1000;
        }else if(currencyUnit == '%'){
            moneyInterestDay = parseInt(totalNumber.replaceAll('.','')*rateInterest/100);
        }
        
        let toDatePeriod = (timeUnit == 'ngày' ? addDayToDate(fromDate, deadlineLoans - 1) :
        (timeUnit == 'tuần' ? addDayToDate(fromDate, deadlineLoans*7 - 1) :
        (timeUnit == 'tháng' ? addDayToDate(fromDate, deadlineLoans*30 - 1) : 0))
        );
        let moneyInterest = numberWithCommas(parseInt(moneyInterestDay*deadlineLoans));
        if(compareTwoDate(dateNewFinal, toDatePeriod)){
            moneyInterest = (timeUnit == 'ngày' ? parseInt(moneyInterestDay*getDays(dateNewFinal, fromDate)) :
            (timeUnit == 'tuần' ? parseInt(moneyInterestDay*(getDays(dateNewFinal, fromDate)/7)) :
            (timeUnit == 'tháng' ? parseInt(moneyInterestDay*(getDays(dateNewFinal, fromDate)/30)) : 0))
            );
            toDatePeriod = dateNewFinal;
        }
        periodLoansArray.push({
            fromDate: fromDate, toDate: toDatePeriod, 
            number_of_days_loans: getDays(toDatePeriod, fromDate), is_paid_interest: 0,
            money_interest: numberWithCommas(moneyInterest)
        });
        for(let i = 1; i < period; i++){
            fromDate = addDayToDate(toDatePeriod, 1);
            const temp = {
                fromDate: fromDate
            };
            
            toDatePeriod = (timeUnit == 'ngày' ? addDayToDate(fromDate, deadlineLoans - 1) :
            (timeUnit == 'tuần' ? addDayToDate(fromDate, deadlineLoans*7 - 1) :
            (timeUnit == 'tháng' ? addDayToDate(fromDate, deadlineLoans*30 - 1) : 0))
            );
            temp.toDate = toDatePeriod;
            let moneyInterest = parseInt(moneyInterestDay*deadlineLoans);
            if(compareTwoDate(dateNewFinal, toDatePeriod)){
                temp.toDate = dateNewFinal;
                moneyInterest = (timeUnit == 'ngày' ? parseInt(moneyInterestDay*getDays(temp.toDate, temp.fromDate)) :
                (timeUnit == 'tuần' ? parseInt(moneyInterestDay*getDays(temp.toDate, temp.fromDate)/7) :
                (timeUnit == 'tháng' ? parseInt(moneyInterestDay*getDays(temp.toDate, temp.fromDate)/30) : 0))
                );
            }
            temp.number_of_days_loans = getDays(temp.toDate, temp.fromDate);
            const tempResult = {
                fromDate: temp.fromDate,
                toDate: temp.toDate,
                number_of_days_loans: temp.number_of_days_loans,
                is_paid_interest: 0,
                money_interest: numberWithCommas(moneyInterest)
            }
            periodLoansArray.push(tempResult);
        }
        console.log({period, periodLoansArray})
        resultUpdate = await interestLoansModel.findOneAndUpdate({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,

        },{
            list_history_payment_interest: periodLoansArray,
            number_of_days_loans: numberOfDayLoansUpdate,
            update_date: moment(new Date()).format("DD/MM/YYYY"),
            update_by: data.username
        },{new: true});
        loans = await interestLoansModel.findOne({
            _id: data.id,
            create_by: data.username,
            is_delete: constants.NOT_DELETED,
        }).lean();
        return loans;
    }catch(error){
        throw error;
    }
}

const deleteById = async(query) => {
    try {
        await interestLoansModel.deleteOne({_id: query.id});
    } catch (error) {
        throw error;
    }
}

// const getListRevenueFilter = async(query) => {
//     try{
        
//         const queryFilter = {
//             create_by: query.username,
//             create_date: {
//                $gte: query.from_date,
//                $lte: query.to_date+1,
//             },
//             is_delete: constants.NOT_DELETED
//         };
//         if(query.type != ''){
//             queryFilter.type = query.type;
//         }
//         console.log('query: ', query);
//         const listRevenue = await revenueModel.paginate(queryFilter,{
//             page: query.page,
//             perPage: query.perPage,
//             lean: true,
//             sort: { create_date: -1 }
//         });
//         const result = {
//             page: listRevenue.page,
//             pages: listRevenue.pages,
//             total: listRevenue.documents,
//             data: listRevenue.data,
//         }
//         return result;
//     }catch(error){
//         throw error;
//     }
// }

const create = async(data) => {
    try{
        return await interestLoansModel.create(data);
    }catch(err){
        throw err;
    }
}


module.exports ={
    create,
    getListInterestLoansByUsername,
    getInterestLoansByIdUsername,
    updateInterestPayment,
    updatePayOffDebt,
    deleteById,
    updatePayUpDebt,
    updateLoansExtension
    // getListRevenueByUsername,
    // getListRevenueFilter
}