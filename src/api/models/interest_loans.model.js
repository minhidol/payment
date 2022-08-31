var mongoose = require('./database');
var defaultSchema = require('./default.model');

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
    total: {
        type: String,
        default: "",
    },
    status: {
        type: Number,
        default: null,
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var interestLoans = mongoose.model('interest_loans', interestLoansSchema);

module.exports = interestLoans;
