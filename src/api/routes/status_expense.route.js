var express = require('express');
var router = express.Router();

var statusExpenseController = require('../controllers/status_expense.controller');

router.post('/create', statusExpenseController.handleCreateStatusExpense);
// router.get('/get-expense', expenseController.handleGetListExpenseByUsername);
// router.get('/filter', expenseController.handleGetListExpenseFilter);
module.exports = router;
