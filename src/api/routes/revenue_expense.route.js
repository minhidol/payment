var express = require('express');
var router = express.Router();

var revenueExpenseController = require('../controllers/revenue_expense.controller');

router.post('/create', revenueExpenseController.handleCreateRevenueExpense);
router.get('/get-revenue-expense', revenueExpenseController.handleGetListRevenueExpenseByUsername);
module.exports = router
