const express = require('express');

const productController = require('../../controller/products.controller');

const router = express();

// Get details for a specific product
router.get('/:id', productController.getOne);
// Creates a new product
router.post('/', productController.createOne);
// Updates one product
router.patch('/:id', productController.updateOne);
// Deletes one product
router.delete('/:id', productController.deleteOne);

module.exports = router;
