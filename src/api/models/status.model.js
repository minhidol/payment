var mongoose = require('./database');
var defaultSchema = require('./default.model');

var statusSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    type:{
        type: String,
        default: ''
    },
    type_status:{
        type: String,
        default: ''
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var status = mongoose.model('status', statusSchema);

module.exports = status;
