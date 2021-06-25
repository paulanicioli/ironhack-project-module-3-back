const express = require('express');
const jwt = require('jsonwebtoken');

const router = express();

const protectedRoutesMiddleware = require('../middlewares/protectedRoutes/protectedRoutes.middlewares');

const authRoutes = require('./auth/auth.routes');
const businessRoutes = require('./business/business.routes');
const businessCategoriesRoutes = require('./businessCategories/businessCategories.routes');
const productsRoutes = require('./products/products.routes');
const ordersRoutes = require('./orders/orders.routes');

const maps = require('../controller/mapsApi.controller')

router.use('/auth', authRoutes);
router.use(protectedRoutesMiddleware.protect(1));

router.use('/categories', businessCategoriesRoutes);
router.use('/businesses', businessRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);

//DELETE ON PRODUCTION!!!
router.get('/geocode', maps.getGeocode)

// Middleware to protect loggedin-only routes

module.exports = router;
