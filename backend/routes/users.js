const express = require('express');
const { updateUserProfile, getUserById, saveRecipe, getSavedRecipes, deleteSavedRecipe, upload } = require('../controllers/userController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth); // Apply auth middleware to all routes

// PATCH update user profile
router.patch('/:id', upload.single('profilePhoto'), updateUserProfile);

// GET user by ID
router.get('/:id', getUserById);

// POST save a recipe
router.post('/save-recipe', saveRecipe);

// DELETE a saved recipe
router.delete('/delete-saved-recipe', deleteSavedRecipe);

// GET saved recipes
router.get('/:userId/saved-recipes', getSavedRecipes);

module.exports = router;