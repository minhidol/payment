const express = require('express');
const userRoute = require('./user.route');
const permissionGroupRoute = require('./permission_group.route');
const permissionActionRoute = require('./permission_action.route');
const authMiddleware = require('../../middlewares/auth.middleware');
const revenueExpenseRoute = require('./revenue_expense.route');
const debtRoute = require('./debt.route');
const router = express.Router()

router.use('/account', userRoute);
router.use(authMiddleware.isAuth);
router.use('/permission-group', permissionGroupRoute);
router.use('/permission-action', permissionActionRoute);
router.use('/revenue-expense', revenueExpenseRoute);
router.use('/debt', debtRoute);
module.exports = router;
