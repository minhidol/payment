var mongoose = require('./database');
var moment = require('moment');

var defaultSchema = new mongoose.Schema({
    create_date: {
        type: String,
        default: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    },
    create_by: {
        type: String,
        default: ""
    },
    update_date: {
        type: String,
        default: moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
    },
    update_by: {
        type: String,
        default: ""
    },
    is_delete: {
        type: Number,
        default: 0
    }
});

module.exports = defaultSchema;
