var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/', userController.managerUser);

module.exports = router;
