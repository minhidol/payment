var express = require('express');
var router = express.Router();

var permissionController = require('../controllers/permission.controller');

router.post('/create', permissionController.handleCreatePermission);
router.post('/get-all', permissionController.handleGetAll);

module.exports = router;
