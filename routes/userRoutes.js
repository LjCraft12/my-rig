const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/userControllers');


router.get('/', userController.getIndex);

// router.get('/search', userController.getSearch);
router.post('/search', userController.postSearch);

module.exports = router;