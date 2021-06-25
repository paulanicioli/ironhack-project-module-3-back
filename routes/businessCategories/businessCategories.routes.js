const express = require('express');

const businessCategoriesController = require('../../controller/businessCategories.controller');

const router = express();

// Get all categories that exist
router.get('/', businessCategoriesController.getAll);
// Get all businesses that belong to a certain category
router.get('/:categoryId', businessCategoriesController.filterFromCategoryAndDistance);

module.exports = router;
