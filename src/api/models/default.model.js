var mongoose = require('./database');

var defaultSchema = new mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now()
    },
    create_by: {
        type: String,
        default: ""
    },
    update_date: {
        type: Date,
        default: null
    },
    update_by: {
        type: String,
        default: Date.now()
    },
    is_delete: {
        type: Number,
        default: 0
    }
});

module.exports = defaultSchema;
