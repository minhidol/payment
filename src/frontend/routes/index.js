const express = require('express');
const homeRoute = require('./home.route');
const constants = require('../../constants/constants');
const userRoute = require('./user.route');
const permissionRoute = require('./permission.route');
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
    return res.render('login');
})
router.use(authMiddleware.isAuthCookie);
router.get('/home', function(req, res){
    return res.render('main', {
        user: req.jwtDecode
    });
})

router.use('/user', userRoute);
router.use('/permission', permissionRoute);

// router.get('/user', function(req, res){
//     return res.render('formCreateUser', {
//         user: req.jwtDecode
//     });
// })
//router.use('/user', userRoute);
//router.use(authMiddleware.isAuth);
//router.use('/home', homeRoute);



module.exports = router;


