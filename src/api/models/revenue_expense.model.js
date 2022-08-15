var mongoose = require('./database');
var defaultSchema = require('./default.model');
var mongoosePaginate = require('mongoose-paginate-async-await');
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


revenueExpenseSchema.plugin(mongoosePaginate);
var revenueExpense = mongoose.model('revenue_expense', revenueExpenseSchema);

module.exports = revenueExpense;
