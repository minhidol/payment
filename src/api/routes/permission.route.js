var express = require('express');
var router = express.Router();

var permissionController = require('../controllers/permission.controller');

router.post('/create', permissionController.handleCreatePermission);
router.post('/get-all', permissionController.handleGetAll);
router.post('/update', permissionController.handleUpdate);
router.get('/get', permissionController.handleGetPermission);
module.exports = router;
