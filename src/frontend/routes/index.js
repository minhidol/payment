const express = require('express');
const constants = require('../../constants/constants');
const userRoute = require('./user.route');
const permissionRoute = require('./permission.route');
const debtRoute = require('./debt.route');
const expenseRoute = require('./expense.route');
const revenueRoute = require('./revenue.route');
const interestLoansRoute = require('./interest_loans.route');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();
router.get('/', function(req, res){
    return res.redirect('/home');
})
router.get('/login', function(req, res){
    const token = req.cookies.token;
    const isTokenExpire = req.isJwtExpired;
    if(token && isTokenExpire == constants.TOKEN_NOT_EXPIRED)
        return res.redirect('/home');
    return res.render('login', {layout: 'index'});
})
router.use(authMiddleware.isAuthCookie);
router.get('/home', function(req, res){
    return res.render('main', {
        layout: 'index',
        user: req.jwtDecode
    });
})

router.use('/user', userRoute);
router.use('/permission', permissionRoute);
router.use('/debt', debtRoute);
router.use('/expense', expenseRoute);
router.use('/revenue', revenueRoute);
router.use('/interest-loans', interestLoansRoute);


module.exports = router;


