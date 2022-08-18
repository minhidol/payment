var express = require('express');
var router = express.Router();

var expenseController = require('../controllers/expense.controller');

router.post('/create', expenseController.handleCreateExpense);
router.get('/get-expense', expenseController.handleGetListExpenseByUsername);
router.get('/filter', expenseController.handleGetListExpenseFilter);
module.exports = router
