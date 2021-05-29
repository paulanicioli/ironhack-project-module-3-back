const express = require('express');
const jwt = require('jsonwebtoken');

const router = express();

const authRoutes = require('./auth/auth.routes');

router.use('/auth', authRoutes);

module.exports = router;
