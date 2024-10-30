const express = require('express');
const {
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    searchRecipes,
    getRecipesByUserId
} = require('../controllers/recipeController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth); // Apply auth middleware to all routes

// POST a new recipe
router.post('/', createRecipe);

// GET all recipes
router.get('/', getRecipes);

// GET a single recipe
router.get('/:id', getRecipe);

// DELETE a recipe
router.delete('/:id', deleteRecipe);

// UPDATE a recipe
router.patch('/:id', updateRecipe);

// GET recipes by userId
router.get('/user/:userId', getRecipesByUserId);

module.exports = router;
