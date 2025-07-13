const orderService = require('../services/orderService');

exports.placeOrder = async (req, res) => {
    try {
        const order = await orderService.placeOrder(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrdersByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await orderService.getOrdersByCustomer(customerId);
        if (!orders.length) {
            return res.status(404).json({ error: `No orders found for customer ID ${customerId}` });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(id, status);
        if (!updatedOrder) {
            return res.status(404).json({ error: `Order with ID ${id} not found` });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedOrder = await orderService.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: `Order with ID ${id} not found` });
        }
        res.json({ message: `Order with ID ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
