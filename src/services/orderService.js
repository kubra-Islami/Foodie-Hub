const orderDAO = require('../DAO/order');
const customerDAO = require('../DAO/customer');
const restaurantDAO = require('../DAO/restaurant');
// const orderDAO = require('../DAO/orderDAO');


exports.placeOrder = async ({ customer_id, restaurant_id, items }) => {
    if (!Array.isArray(items)) {
        throw new Error("items must be an array");
    }
    // You can add validation here if needed
    // return orderDAO.createOrder({ customer_id, restaurant_id, items });
    const customer = await customerDAO.getById(customer_id);
    if (!customer) {
        throw new Error(`Customer with ID ${customer_id} does not exist`);
    }

    const restaurant = await restaurantDAO.getById(restaurant_id);
    if (!restaurant) {
        throw new Error(`Restaurant with ID ${restaurant_id} does not exist`);
    }

    // اگر همه چیز درست بود، سفارش رو بساز
    return orderDAO.createOrder({ customer_id, restaurant_id, items });
};

exports.getAllOrders = async () => {
    return orderDAO.getAllOrders();
};

exports.getOrdersByCustomer = async (customerId) => {
    return orderDAO.getOrdersByCustomer(customerId);
};

exports.updateOrderStatus = async (id, status) => {
    return orderDAO.updateOrderStatus(id, status);
};

exports.deleteOrder = async (id) => {
    return orderDAO.deleteOrder(id);
};
