var express = require('express');
var router = express.Router();
const expenseController = require('../controllers/expense.controller');


router.get('/', expenseController.renderExpense);

module.exports = router;
