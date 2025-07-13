// const menuItemDAO = require('../DAO/menuItem');
//
// exports.addMenuItem = dao.create;
// exports.getMenuItemsByRestaurant = dao.getAllByRestaurant;
// exports.updateMenuItem = dao.update;
// exports.deleteMenuItem = dao.remove;
// exports.toggleAvailability = dao.setAvailability;


// exports.addMenuItem = (data) => {
//     return menuItemDAO.create(data);
// };
//
// exports.getMenuItemsByRestaurant = (id, data) => {
//     return menuItemDAO.update(id, data);
// };

const menuItemDAO = require('../DAO/menuItem');
const restaurantDAO = require('../DAO/restaurant');

// Add a menu item
exports.addMenuItem =async (data) => {
    // return menuItemDAO.create(data);

    const restaurant = await restaurantDAO.getById(data?.restaurant_id);
    if (!restaurant) {
        const err = new Error(`Restaurant with id ${data.restaurant_id} does not exist`);
        err.statusCode = 400;
        throw err;
    }
    return menuItemDAO.create(data);
};

// Get all menu items for a specific restaurant
exports.getMenuItemsByRestaurant = (restaurantId) => {
    return menuItemDAO.getAllByRestaurant(restaurantId);
};

// Update a menu item
exports.updateMenuItem = (id, data) => {
    return menuItemDAO.update(id, data);
};

// Delete a menu item
exports.deleteMenuItem = (id) => {
    return menuItemDAO.remove(id);
};

// Toggle availability (set is_available to true or false)
exports.toggleAvailability = (id, is_available) => {
    const available = Boolean(JSON.parse(is_available));
    return menuItemDAO.setAvailability(id, available);
};
