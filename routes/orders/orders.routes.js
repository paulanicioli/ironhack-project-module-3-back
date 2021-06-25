const express = require('express');

const orderController = require('../../controller/orders.controller');

const router = express();

// Get orders for a given user
router.post('/my-orders', orderController.findOwner);
// Get details for a specific order
router.get('/:id', orderController.getOne);
// Creates a new order
router.post('/', orderController.createOne);
// Updates one order
router.patch('/:id', orderController.updateOne);

module.exports = router;
