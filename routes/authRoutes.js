const express = require('express'),
    router = express.Router(),
    authController = require('../controllers/authControllers'),
    isAuth = require('../middleware/is-auth');


router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignUp);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/addPost', isAuth, authController.postUserPost);

router.get('/message', authController.getMessage);
router.post('/message', authController.postMessage);

router.get('/profile/', isAuth, authController.getProfile);
router.post('/logout', authController.postLogout);

module.exports = router;