const express = require('express');

const businessValidator = require('../../middlewares/validations/business.middleware');
const businessController = require('../../controller/business.controller');

const router = express();

// Get all businesses
router.get('/', businessController.getAll);
// Get details for a specific business
router.get('/:id', businessController.getOne);
router.post('/', businessValidator.createOne, businessController.createOne);
//By default, Mongoose doesn't replace the original document, but changes it
router.patch('/:id', businessController.updateOne);
router.delete('/:id', businessController.deleteOne);

module.exports = router;
