var express = require('express');
var router = express.Router();

var permissionGroupController = require('../controllers/permission_group.controller');

router.post('/create', permissionGroupController.handleCreatePermissionGroup);
router.post('/update-action', permissionGroupController.handleUpdateActionPermission);
module.exports = router
