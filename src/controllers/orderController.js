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
        const orders = await orderService.getOrdersByCustomer(req.params.customer_id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const updated = await orderService.updateOrderStatus(req.params.id, 'completed');
        if (!updated) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
