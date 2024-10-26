const express = require('express');
const { createRecipe } = require('../controllers/recipeController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();
const Recipe = require('../models/RecipeModel'); // Assuming you have a Recipe model

router.use(requireAuth); // Apply auth middleware to all routes

// POST a new recipe
router.post('/', createRecipe);

// GET /api/recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
