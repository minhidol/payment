var express = require('express');
var router = express.Router();

var revenueExpenseController = require('../controllers/revenue_expense.controller');

router.post('/create', revenueExpenseController.handleCreateRevenueExpense);
//router.get('/get-list-feature', permissionActionController.handleGetListFeature);
module.exports = router
