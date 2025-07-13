const restaurantService = require('../services/restaurantService');

exports.getAllRestaurants = async (req, res) => {
    try {
        console.log('1');
        const restaurants = await restaurantService.getAll();
        console.log('2');
        res.json({ success: true, data: restaurants });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


exports.addRestaurant = async (req, res) => {
    try {
        const { name, address } = req.body;
        const result = await restaurantService.create({ name, address });
        res.status(201).json({
            success: true,
            message: 'Restaurant added successfully',
            data: result
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to add restaurant' });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, address } = req.body;
        const result = await restaurantService.update(id, { name, address });
        if (!result) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.json({
            success: true,
            message: 'Restaurant updated successfully',
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to update restaurant' });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await restaurantService.remove(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Failed to delete restaurant' });
    }
};

