var express = require('express');
var router = express.Router();
const revenueExpenseController = require('../controllers/revenue_expense.controller');


router.get('/', revenueExpenseController.renderRevenueExpense);

module.exports = router;
