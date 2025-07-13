const menuItemService  = require('../services/menuItemService');

exports.addMenuItem = async (req, res) => {
    try {
        const data = req.body;
        const newItem = await menuItemService.addMenuItem(data);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }

};

exports.getMenuItems = async (req, res) => {
    const { restaurant_id } = req.params;
    const items = await menuItemService .getMenuItemsByRestaurant(restaurant_id);
    res.json(items);
};

exports.updateMenuItem = async (req, res) => {

    try {
        const id = req.params.id;
        const data = req.body;
        const updated = await menuItemService.updateMenuItem(id, data);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error updating menu item' });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await menuItemService.deleteMenuItem(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ error: `Menu item with ID ${req.params.id} not found` });
        }

        res.status(200).json({ message: `Menu item with ID ${req.params.id} deleted successfully.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.setAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_available } = req.body;

        const item = await menuItemService.toggleAvailability(id, is_available);

        if (!item) {
            return res.status(404).json({ error: `Menu item with ID ${id} not found` });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
