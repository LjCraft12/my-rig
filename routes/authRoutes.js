const express = require('express'),
    router = express.Router(),
    authController = require('../controllers/authControllers');


router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignUp);

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/profile/', authController.getProfile);
router.post('/logout', authController.postLogout);


module.exports = router;