const Category = require("../models/category.model");
const Product = require('../models/product.model')

module.exports = {

    // Get all categories along with total count
    getCategories: async (req, res) => {
        try {
            const result = await Category.aggregate([
                {
                    $facet: {
                        count: [{ $count: 'totalCategories' }],
                        categories: [{ $match: {} }, { $project: { _id: 0 } }]
                    }
                }
            ]);
            const count = result[0]?.count[0]?.totalCategories || 0;
            const categories = result[0]?.categories || [];
            const data = {
                totalCategories: count,
                categories
            }
            return res.status(200).json(data);
        } catch (error) {
            console.error(`Error fetching categories:, ${error.message}`);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
    },

    // Get products for a specific category
    getCategoryProducts: async (req, res) => {
        try {
            const { categoryId } = req.query;
            const categoryNum = parseInt(categoryId)

            const data = await Category.aggregate([
                { $match: { categoryId: categoryNum } },
                {
                    $lookup: {
                        from: "products",
                        localField: "categoryId",
                        foreignField: "categoryId",
                        as: "products"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        "products._id": 0,
                        "products.categoryId": 0
                    }
                }
            ]);
            return res.status(200).json(data);
        } catch (error) {
            console.error(`Error fetching category products:,${error.message}`);
            return res.status(500).json({ message: 'Error fetching category products' });
        }

    },

    // Add a new product
    addProduct: async (req, res) => {
        try {
            const product = req.body;
            const newProduct = new Product(product);
            await newProduct.save()
            res.status(201).json({ message: 'Product saved successfully' });
        } catch (error) {
            console.error(`Error saving product:, ${error.message}`);
            res.status(500).json({ message: 'Error saving product' });
        }
    }
}