var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);

module.exports = router
