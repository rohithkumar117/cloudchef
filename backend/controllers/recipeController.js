const Recipe = require('../models/RecipeModel');
const mongoose = require('mongoose');
const User = require('../models/UserModel');

//get all recpies
const getRecipes= async(req,res)=>{
    try {
        const recipes = await Recipe.find({}).sort({createdAt: -1})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//get a single recpies
const getRecipe = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recipe' });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' });
    }

    res.status(200).json(recipe);
}

//create new recipe
const createRecipe = async (req, res) => {
    const { title, ingredients, process } = req.body;
    const userId = req.userId; // Ensure this is set by the auth middleware

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const fullName = `${user.firstName} ${user.lastName}`;
        const recipe = await Recipe.create({ title, ingredients, process, fullName, userId }); // Include userId
        console.log('Created recipe:', recipe); // Debug: Log the created recipe
        res.status(200).json(recipe); // Return the full recipe object, including userId
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recipe' });
    }

    try {
        const recipe = await Recipe.findOneAndDelete({ _id: id });
        if (!recipe) {
            return res.status(404).json({ error: 'No such recipe' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

//update recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such recipe' });
    }

    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!recipe) {
            return res.status(404).json({ error: 'No such recipe' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Search recipes by title
const searchRecipes = async (req, res) => {
    const { query } = req.query; // Get the search query from the request

    try {
        const recipes = await Recipe.find({
            title: { $regex: query, $options: 'i' } // Case-insensitive search
        });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get recipes by user ID
const getRecipesByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });
        if (recipes.length === 0) {
            return res.status(404).json({ error: 'No recipes found for this user' });
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    searchRecipes,
    getRecipesByUserId
};
