var express = require('express');
var router = express.Router();
const interestLoansController = require('../controllers/interest_loans.controller');


router.get('/', interestLoansController.renderInterestLoans);

module.exports = router;
