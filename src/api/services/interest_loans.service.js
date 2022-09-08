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
        interestLoans.error = 0;
        return interestLoans;
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
                    console.log({from: item.fromDate, to: item.toDate})
                    const tempMonth = getMonthDifference(item.fromDate, item.toDate);
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
        console.log('total rest: ', {totalRest, currentUnit, rateInterest});
        let arr_list_payment = [];
        if(currentUnit == '%'){
            let moneyInterestMonth =  parseInt(totalRest*rateInterest/100);
            let moneyInterest = moneyInterestMonth*deadlineInterest;
            console.log({total, totalRest, moneyInterestMonth, moneyInterest})
            listPayment.forEach(item => {
                if(item.is_paid_interest == 0){
                    console.log({from: item.fromDate, to: item.toDate})
                    const tempMonth = getMonthDifference(item.fromDate, item.toDate);
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
        let fromDate = finalRevenue.fromDate;
        let toDate = finalRevenue.toDate;
        const time_unit = loans.time_unit;
        const rateInterest = loans.interest;
        const currency_unit = loans.currency_unit;
        const numberOfDayLoans = loans.number_of_days_loans;
        const deadlineLoans = loans.deadline_loans;
        let numberOfDayLoansUpdate = 0;
        const periodLoansArray = [];
        if(time_unit == 'ngày'){
            numberOfDayLoansUpdate = numberOfDayLoans + data.timeExtension;
            let dateNewFinal = addDayToDate(toDate, data.timeExtension);
            let getProfitTime = getDays(dateNewFinal, fromDate);
            let period = parseInt(getProfitTime/deadlineLoans);
            const surplus = getProfitTime%deadlineLoans;
            if(surplus > 0)
              period++;
            console.log({fromDate, toDate, dateNewFinal, deadline: data.timeExtension, getProfitTime,
            period, surplus})
            let moneyInterestDay =  parseInt(rateInterest)*1000;
            let toDatePeriod = addDayToDate(fromDate, deadlineLoans);
            periodLoansArray.push({fromDate: fromDate, toDate: toDatePeriod, 
                number_of_days_loans: getDays(toDatePeriod, fromDate), is_paid_interest: 0,
                money_interest: numberWithCommas(parseInt(moneyInterestDay*deadlineLoans))
              });
        }
        console.log('periodLoansArray: ', periodLoansArray)
        //return loans;
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