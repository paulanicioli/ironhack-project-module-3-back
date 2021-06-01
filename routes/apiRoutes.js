const express = require('express');
const jwt = require('jsonwebtoken');

const router = express();

const protectedRoutesMiddleware = require('../middlewares/protectedRoutes/protectedRoutes.middlewares');

const authRoutes = require('./auth/auth.routes');
const businessRoutes = require('./business/business.routes');

router.use('/auth', authRoutes);

// Middleware to protect loggedin-only routes
router.use(protectedRoutesMiddleware.protect(2));

router.use('/businesses', businessRoutes);

module.exports = router;
