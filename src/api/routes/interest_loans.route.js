var express = require('express');
var router = express.Router();

var interestLoansController = require('../controllers/interest_loans.controller');

router.post('/create', interestLoansController.handleCreateInterestLoans);
router.get('/get-loans', interestLoansController.handleGetListInterestLoansByUsername);
module.exports = router;
    