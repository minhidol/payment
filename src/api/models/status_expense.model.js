var mongoose = require('./database');
var defaultSchema = require('./default.model');

var statusExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    type:{
            type: String,
            default: ''
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var statusExpense = mongoose.model('status_expense', statusExpenseSchema);

module.exports = statusExpense;
