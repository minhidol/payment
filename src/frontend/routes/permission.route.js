var express = require('express');
var router = express.Router();
const permissionController = require('../controllers/permission.controller');


router.get('/', permissionController.managerPermission);

module.exports = router;
