const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemMneuController');

router.post('/', controller.addMenuItem);
router.get('/:restaurant_id', controller.getMenuItems);
router.put('/:id', controller.updateMenuItem);
router.delete('/:id', controller.deleteMenuItem);
router.patch('/:id/availability', controller.setAvailability);

module.exports = router;
