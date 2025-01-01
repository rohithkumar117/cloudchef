const express = require('express');
const { addItemToCart, getCartItems } = require('../controllers/cartController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth); // Apply auth middleware to all routes

// POST add an item to the cart
router.post('/', addItemToCart);

// GET all cart items
router.get('/', getCartItems);

module.exports = router;