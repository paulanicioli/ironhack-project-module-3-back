const express = require('express');

const businessCategoriesController = require('../../controller/businessCategories.controller');

const router = express();

// Get all categories that exist
router.get('/', businessCategoriesController.getAll);

module.exports = router;
