var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.controller');

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/get-list-staff', userController.handleGetListStaff);
router.post('/update', userController.handleUpdateUser);
router.get('/get-by-username', userController.handleGetUser);

module.exports = router
