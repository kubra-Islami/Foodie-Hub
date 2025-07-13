const express = require('express');
const app = express();

require('dotenv').config();
const restaurantRoutes = require('./src/routes/restaurants');
const menuItemRoutes = require('./src/routes/menuItem');
const customerRoutes = require('./src/routes/customer');
const orderRoutes = require('./src/routes/order');


app.use(express.json());
app.use('/restaurants', restaurantRoutes);
app.use('/menu-items', menuItemRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//end