const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userControllers');


router.get('/', userController.getIndex);


module.exports = router;