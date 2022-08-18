var mongoose = require('./database');
var defaultSchema = require('./default.model');
var mongoosePaginate = require('mongoose-paginate-async-await');
var expenseSchema = new mongoose.Schema({
    receiver: {
        type: String,
        default: "",
        require: true
    },
    total: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "",
    },
    note: {
        type: String,
        default: "",
    },
        is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


expenseSchema.plugin(mongoosePaginate);
var expense = mongoose.model('expense', expenseSchema);

module.exports = expense;
