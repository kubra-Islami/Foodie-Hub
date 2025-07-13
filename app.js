const express = require('express');
const app = express();

require('dotenv').config();
const restaurantRoutes = require('./src/routes/restaurants');

app.use(express.json());
app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//end