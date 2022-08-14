var mongoose = require('./database');
var defaultSchema = require('./default.model');

var debtSchema = new mongoose.Schema({
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


var debt = mongoose.model('debt', debtSchema);

module.exports = debt;
