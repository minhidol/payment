var mongoose = require('./database');
var defaultSchema = require('./default.model');

var revenueExpenseSchema = new mongoose.Schema({
    type: {
        type: String,
        default: null,
        require: true
    },
    note: {
        type: String,
        default: "",
    },
    total: {
        type: String,
        default: "",
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var revenueExpense = mongoose.model('revenue_expense', revenueExpenseSchema);

module.exports = revenueExpense;
