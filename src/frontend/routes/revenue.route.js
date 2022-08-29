var express = require('express');
var router = express.Router();
const revenueController = require('../controllers/revenue.controller');


router.get('/', revenueController.renderRevenue);

module.exports = router;
