var mongoose = require('./database');
var defaultSchema = require('./default.model');

var menuActionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        require: true
    },
    id: {
        type: Number,
        default: null,
        unique: true,
        require: true
    },
    type: {
        type: String, // menu, sub_menu, action
        default: null,
        require: true
    },
    parent_menu: {
        type: String, // menu: '', sub_menu: menu, action: menu, sub_menu
        default: null,
        require: true
    },
    parent_sub_menu: {
        type: String, // menu: '', sub_menu: menu, action: menu, sub_menu
        default: null,
        require: true
    },
    link: {
        type: String,
        default: null
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var menuAction = mongoose.model('menu_action', menuActionSchema);

module.exports = menuAction;
