const express = require('express');
const router = express.Router();
const { getCategories, addProduct, getCategoryProducts } = require('../controllers/productController');

//Routes
router.route('/list').get(getCategoryProducts);
router.route('/categories').get(getCategories);
router.route('/save').post(addProduct);

module.exports = router;