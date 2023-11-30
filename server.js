const express = require('express');
const morgan = require('morgan');
const apiKeyCheck = require('./middlewares/apiKeyCheck');

const app = express();
const port = process.env.PORT || 5000;

//Database configuration
require('./config/db');

//Middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(apiKeyCheck);

//Exporting Routes
const productRoutes = require('./routes/productRoute');

//Routes
app.use('/api/product/', productRoutes);

app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});