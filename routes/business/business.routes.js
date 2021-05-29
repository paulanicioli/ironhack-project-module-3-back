const express = require('express');
const businessController = require('../../controller/business.controller');

const router = express();

// Get all businesses that belong to the chosen category (assuming category is sent as a query string)
router.get('/', businessController.getAllFromCategory);
// Get details for a specific business
router.get('/:id', businessController.getOne);
router.post('/', businessController.createOne);
router.put('/:id', businessController.updateOne);
router.delete('/:id', businessController.deleteOne);

module.exports = router;
