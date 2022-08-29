var mongoose = require('./database');
var defaultSchema = require('./default.model');
var mongoosePaginate = require('mongoose-paginate-async-await');
var revenueSchema = new mongoose.Schema({
    payer: {
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


revenueSchema.plugin(mongoosePaginate);
var revenue = mongoose.model('revenue', revenueSchema);

module.exports = revenue;
