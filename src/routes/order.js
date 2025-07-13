const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/', orderController.placeOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get orders for a specific customer
router.get('/customer/:customerId', orderController.getOrdersByCustomer);

// Update an order's status (e.g., pending → completed)
router.put('/:id/status', orderController.updateOrderStatus);

// Delete or cancel an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
