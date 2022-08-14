var express = require('express');
var router = express.Router();
const debtController = require('../controllers/debt.controller');


router.get('/', debtController.renderDebt);

module.exports = router;
