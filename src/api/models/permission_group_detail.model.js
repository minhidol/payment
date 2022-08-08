var mongoose = require('./database');
var defaultSchema = require('./default.schema');

var permissionGroupDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    name_detail: {
        type: String,
        default: ''
    },
    action: {
        type: Array
    },
    is_delete: {
        type: Number,
        default: 0
    },
    ...defaultSchema.obj,
}, { strict: false });


var permissionGroupDetail = mongoose.model('permission_group_detail', permissionGroupDetailSchema);

module.exports = permissionGroupDetail;
