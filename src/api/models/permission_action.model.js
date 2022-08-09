var mongoose = require('./database');
var defaultSchema = require('./default.model');

var permissionActionSchema = new mongoose.Schema({
    name_feature: {
        type: String,
        default: '',
    },
    action_feature: [
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


var permissionAction = mongoose.model('permission_action', permissionActionSchema);

module.exports = permissionAction;
