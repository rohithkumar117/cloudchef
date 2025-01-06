const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

// Add an item to the cart
const addItemToCart = async (req, res) => {
    const userId = req.userId;
    const { ingredient, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { items: { ingredient, quantity } } },
            { new: true, upsert: true }
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add multiple items to the cart
const addMultipleItemsToCart = async (req, res) => {
    const userId = req.userId;
    const { ingredients } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const itemsToAdd = ingredients.map(ingredient => ({
            ingredient: ingredient.name,
            quantity: ingredient.quantity
        }));

        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { items: { $each: itemsToAdd } } },
            { new: true, upsert: true }
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all cart items
const getCartItems = async (req, res) => {
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'No cart found for this user' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an item from the cart
const deleteItemFromCart = async (req, res) => {
    const userId = req.userId;
    const { ingredientId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: ingredientId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ error: 'No cart found for this user' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addItemToCart,
    addMultipleItemsToCart,
    getCartItems,
    deleteItemFromCart
};