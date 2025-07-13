const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController.js');

router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.addRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;