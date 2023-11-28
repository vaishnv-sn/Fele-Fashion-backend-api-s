const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());

//Exporting Routes
const productRoutes = require('./routes/product.route');

//Routes
app.use('/api/product/', productRoutes);

app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});