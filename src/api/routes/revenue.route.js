var express = require('express');
var router = express.Router();

var revenueController = require('../controllers/revenue.controller');

router.post('/create', revenueController.handleCreateRevenue);
router.get('/get-revenue', revenueController.handleGetListRevenueByUsername);
router.get('/filter', revenueController.handleGetListRevenueFilter);
module.exports = router;
