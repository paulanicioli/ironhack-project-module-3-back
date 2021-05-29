const express = require('express');

const authMiddleware = require('../../middlewares/validations/auth.middlewares');
const authController = require('../../controller/auth.controller');

const router = express();

router.post('/login', authMiddleware.login, authController.login);

router.post('/signup', authMiddleware.signup, authController.signup);

module.exports = router;
