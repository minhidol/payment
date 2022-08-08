const express = require('express');
const userRoute = require('./user.route');
const permissionGroupRoute = require('./permission_group.route');
//const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router()

router.use('/account', userRoute);
// router.use(authMiddleware.isAuth);
router.use('/permission-group', permissionGroupRoute);


module.exports = router;
