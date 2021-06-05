const express = require('express');
const jwt = require('jsonwebtoken');

const router = express();

const protectedRoutesMiddleware = require('../middlewares/protectedRoutes/protectedRoutes.middlewares');

const authRoutes = require('./auth/auth.routes');
const businessRoutes = require('./business/business.routes');
const businessCategoriesRoutes = require('./businessCategories/businessCategories.routes');

router.use('/auth', authRoutes);

router.use('/categories', businessCategoriesRoutes);
router.use('/businesses', businessRoutes);

// Middleware to protect loggedin-only routes
router.use(protectedRoutesMiddleware.protect(2));

module.exports = router;
