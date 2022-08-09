var mongoose = require('./database');
var defaultSchema = require('./default.model');

var permissionGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        require: true
    },
    type: {
        type: Number,
        default: null,
        require: true
    },
    menu: [
        {
            name: {
                type: String,
            },
            sub_menus: [{
                name: String,
                link: String
            }]
        }

    ],
    action: [
        {
            name: String,
            name_detail: String
        }
    ],
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var permissionGroup = mongoose.model('permission_group', permissionGroupSchema);

module.exports = permissionGroup;
