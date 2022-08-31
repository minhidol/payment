var express = require('express');
var router = express.Router();

var statusController = require('../controllers/status.controller');

router.post('/create', statusController.handleCreateStatusRevenue);
// router.get('/get-expense', expenseController.handleGetListExpenseByUsername);
// router.get('/filter', expenseController.handleGetListExpenseFilter);
module.exports = router;
