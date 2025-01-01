const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

// Add an item to the cart
const addItemToCart = async (req, res) => {
    const { userId, items } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { items: { $each: items } } },
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

module.exports = {
    addItemToCart,
    getCartItems
};