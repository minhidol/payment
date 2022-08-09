const express = require('express');
const homeRoute = require('./home.route');
const userRoute = require('./user.route');
const permissionRoute = require('./permission.route');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/login', function(req, res){
    const token = req.cookies.token;
    if(token)
        return res.redirect('/');
    return res.render('login');
})
router.use(authMiddleware.isAuthCookie);
router.get('/', function(req, res){
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


