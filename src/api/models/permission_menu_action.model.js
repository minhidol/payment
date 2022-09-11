var mongoose = require('./database');
var defaultSchema = require('./default.model');

var permissionMenuActionSchema = new mongoose.Schema({
    type_permission: {
        type: Number,
        require: true
    },
    type_menu_action: {
        type: Number,
        require: true
    },
    
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var permissionMenuAction = mongoose.model('permission_menu_action', permissionMenuActionSchema);

module.exports = permissionMenuAction;
