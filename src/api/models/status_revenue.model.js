var mongoose = require('./database');
var defaultSchema = require('./default.model');

var statusRevenueSchema = new mongoose.Schema({
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


var statusRevenue = mongoose.model('status_revenue', statusRevenueSchema);

module.exports = statusRevenue;
