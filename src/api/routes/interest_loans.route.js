var express = require('express');
var router = express.Router();

var interestLoansController = require('../controllers/interest_loans.controller');

router.post('/create', interestLoansController.handleCreateInterestLoans);
router.get('/get-loans', interestLoansController.handleGetListInterestLoansByUsername);
router.get('/get-loans-by-id', interestLoansController.handleGetInterestLoansByIdUsername);
router.post('/update-interest', interestLoansController.handleUpdateInterestPayment);
router.post('/update-pay-debt', interestLoansController.handleUpdatePayOffDebt);
router.post('/delete', interestLoansController.handleDeleteInterestLoan);
module.exports = router;
    