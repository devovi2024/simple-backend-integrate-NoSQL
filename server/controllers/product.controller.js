const mongoose = require("mongoose");
const productModel = require('../model/product.model.js');
const fs = require('fs'); // Import the fs module

// Function to save products to JSON file
const saveProductsToFile = (products) => {
    fs.writeFile('product.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Products saved to product.json');
        }
    });
};

// Create a new product
const createProduct = async (req, res) => {
    const { title, short_des, price, discount, image, stock, star, remark } = req.body;

    const newProduct = new productModel({
        title,
        short_des,
        price,
        discount,
        image,
        stock,
        star,
        remark
    });

    try {
        const savedProduct = await newProduct.save();
        // Read existing products from file
        const existingProducts = JSON.parse(fs.readFileSync('product.json', 'utf8') || '[]');
        existingProducts.push(savedProduct); // Add new product to existing ones
        saveProductsToFile(existingProducts); // Save updated products to file
        res.status(201).json({
            success: true,
            product: savedProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product, please try again',
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products, please try again',
        });
    }
};

// Get a product by ID from the database
const getProductById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid product ID format',
        });
    }

    try {
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'No product found with that ID',
            });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product, please try again',
        });
    }
};

// Get a product by ID from product.json
const getProductFromFileById = (req, res) => {
    const id = req.params.id;
    const products = JSON.parse(fs.readFileSync('product.json', 'utf8') || '[]');

    const product = products.find(p => p._id === id);
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'No product found with that ID in product.json',
        });
    }
    res.status(200).json(product);
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid product ID format',
        });
    }

    const updatedProduct = {
        title: req.body.title,
        short_des: req.body.short_des,
        price: req.body.price,
        discount: req.body.discount,
        image: req.body.image,
        stock: req.body.stock,
        star: req.body.star,
        remark: req.body.remark,
    };

    try {
        const product = await productModel.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'No product found with that ID',
            });
        }

        // Update product in product.json
        const products = JSON.parse(fs.readFileSync('product.json', 'utf8') || '[]');
        const index = products.findIndex(p => p._id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct }; // Update existing product
            saveProductsToFile(products); // Save updated products to file
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product, please try again',
        });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid product ID format',
        });
    }

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: 'No product found with that ID',
            });
        }

        // Delete product from product.json
        let products = JSON.parse(fs.readFileSync('product.json', 'utf8') || '[]');
        products = products.filter(p => p._id !== id); // Filter out deleted product
        saveProductsToFile(products); // Save updated products to file

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            product: deletedProduct,
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product, please try again',
        });
    }
};

module.exports = { 
    createProduct, 
    getProducts, 
    getProductById, 
    getProductFromFileById, 
    updateProduct, 
    deleteProduct 
};
