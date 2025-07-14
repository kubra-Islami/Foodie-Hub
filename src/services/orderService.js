const orderDAO = require('../DAO/order');

exports.placeOrder = async ({ customer_id, restaurant_id, items }) => {
    if (!Array.isArray(items)) {
        throw new Error('items must be an array');
    }
    return orderDAO.createOrder({ customer_id, restaurant_id, items });
};

exports.getAllOrders = () => orderDAO.getAllOrders();

exports.getOrdersByCustomer = (customer_id) => orderDAO.getOrdersByCustomer(customer_id);

exports.updateOrderStatus = (id, status) => orderDAO.updateOrderStatus(id, status);

exports.deleteOrder = (id) => orderDAO.deleteOrder(id);
