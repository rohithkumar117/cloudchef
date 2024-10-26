const express = require('express');
const { createRecipe } = require('../controllers/recipeController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth); // Apply auth middleware to all routes

// POST a new recipe
router.post('/', createRecipe);

module.exports = router;
