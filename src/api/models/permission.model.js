var mongoose = require('./database');
var defaultSchema = require('./default.model');

var permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        require: true
    },
    type: {
        type: Number,
        default: null,
        require: true,
        unique: true
    },
    menu_action: {
        type: Object,
        default: null
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var permissionGroup = mongoose.model('permission', permissionSchema);

module.exports = permissionGroup;
