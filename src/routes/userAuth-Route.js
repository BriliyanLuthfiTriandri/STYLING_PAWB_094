const express = require('express');
const router = express.Router();
const { isSignIn } = require('../middlewares/isSignIn');
const authUser = require('../controllers/user-controller');

// Routes untuk Sign-Up
router.get('/sign-up', authUser.renderSignUpPage);
router.post('/sign-up', authUser.registerUser);

// Routes untuk Sign-In
router.get('/sign-in', authUser.renderSignInPage);
router.post('/sign-in', authUser.loginUser);

// Routes untuk Logout
router.get('/logoutUser', authUser.logoutUser);


router.get('/', isSignIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

router.get('/contact', isSignIn, (req, res) =>{
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'Contact',
        showNavbar: true,
        showFooter: true,
    });
});


module.exports = router;