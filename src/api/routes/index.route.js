const express = require('express');
const userRoute = require('./user.route');
const permissionGroupRoute = require('./permission_group.route');
const permissionActionRoute = require('./permission_action.route');
const permissionRoute = require('./permission.route');
const menuActionRoute = require('./menu_action.route');
const authMiddleware = require('../../middlewares/auth.middleware');
const expenseRoute = require('./expense.route');
const revenueRoute = require('./revenue.route');
const debtRoute = require('./debt.route');
const statusExpenseRoute = require('./status_expense.route');
const statusRevenueRoute = require('./status_revenue.route');
const statusRoute = require('./status.route');
const interestLoansRoute = require('./interest_loans.route');
const router = express.Router()

router.use('/account', userRoute);
router.use(authMiddleware.isAuth);
router.use('/permission-group', permissionGroupRoute);
router.use('/permission-action', permissionActionRoute);
router.use('/expense', expenseRoute);
router.use('/revenue', revenueRoute);
router.use('/debt', debtRoute);
router.use('/status-expense', statusExpenseRoute);
router.use('/status-revenue', statusRevenueRoute);
router.use('/status', statusRoute);
router.use('/interest-loans', interestLoansRoute);
router.use('/permission', permissionRoute);
router.use('/menu-action', menuActionRoute);
module.exports = router;
