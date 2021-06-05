const express = require('express');

const businessValidator = require('../../middlewares/validations/business.middleware');
const businessController = require('../../controller/business.controller');

const router = express();

// Get all businesses
router.get('/', businessController.getAll);
// Get details for a specific business
router.get('/:id', businessController.getOne);
// Creates a new business - signup flow
router.post('/', businessValidator.createOne, businessController.createOne);
router.patch('/:id', businessController.updateOne);
router.delete('/:id', businessController.deleteOne);

module.exports = router;
