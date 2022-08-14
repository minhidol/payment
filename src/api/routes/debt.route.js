var express = require('express');
var router = express.Router();

var debtController = require('../controllers/debt.controller');

router.post('/create', debtController.handleCreateDebt);
//router.get('/get-list-feature', permissionActionController.handleGetListFeature);
module.exports = router
