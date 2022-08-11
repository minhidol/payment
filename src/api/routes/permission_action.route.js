var express = require('express');
var router = express.Router();

var permissionActionController = require('../controllers/permission_action.controller');

router.post('/create', permissionActionController.handleCreateAndUpdatePermissionAction);
router.get('/get-list-feature', permissionActionController.handleGetListFeature);
module.exports = router
