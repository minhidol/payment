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
        default: Date.now()
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
