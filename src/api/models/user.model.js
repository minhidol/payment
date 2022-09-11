var mongoose = require('./database');
var defaultSchema = require('./default.model');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: null,
        required: true
    },
    number_phone: {
        type: String,
        default: null
    },
    role: {
        type: Number,
        default: "",
        required: true
    },
    roleDetail: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    is_delete: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var user = mongoose.model('user', userSchema);

module.exports = user;
