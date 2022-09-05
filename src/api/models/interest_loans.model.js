var mongoose = require('./database');
var defaultSchema = require('./default.model');
var mongoosePaginate = require('mongoose-paginate-async-await');
var moment = require('moment');
var interestLoansSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        require: true
    },
    cmnd: {
        type: String,
        default: "",
    },
    cmnd_date: {
        type: String,
        default: "",
    },
    cmnd_address: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    number_phone: {
        type: String,
        default: "",
    },
    type_of_collateral: {
        type: String,
        default: "",
    },
    collateral: {
        type: String,
        default: "",
    },
    profit_form: {
        type: String,
        default: "",
    },
    type_status_profit_form: {
        type: String,
        default: "",
    },
    total: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: null,
    },
    is_delete: {
        type: Number,
        default: 0
    },
    term_of_loan: {
        type: Number, 
        require: true
    },
    deadline_loans: {
        type: Number,
        require: true
    },
    currency_unit: {
        type: String,
        require: true
    },
    time_unit: {
        type: String,
        require: true
    },
    interest: {
        type: String,
        require: true
    },
    profit_form_string: {
        type: String,
        require: true
    },
    interest_paid: {
        type: String,
        default: 0
    },
    old_debt: {
        type: String,
        default: 0
    },
    number_of_days_loans: {
        type: Number,
        default: 0
    },
    latest_interest_payment: {
        type: String,
        default: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    },
    list_history_payment_interest: {
        type: Array,
        default: []
    },
    ...defaultSchema.obj,
}, { strict: false });

interestLoansSchema.plugin(mongoosePaginate);
var interestLoans = mongoose.model('interest_loans', interestLoansSchema);

module.exports = interestLoans;
