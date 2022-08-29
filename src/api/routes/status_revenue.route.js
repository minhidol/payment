var express = require('express');
var router = express.Router();

var statusRevenueController = require('../controllers/status_revenue.controller');

router.post('/create', statusRevenueController.handleCreateStatusRevenue);
// router.get('/get-expense', expenseController.handleGetListExpenseByUsername);
// router.get('/filter', expenseController.handleGetListExpenseFilter);
module.exports = router;
