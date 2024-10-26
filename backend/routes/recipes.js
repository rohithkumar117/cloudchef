const express = require ('express')
const {
    createRecipe,
    getRecipe,
    getRecipes,
    deleteRecipe,
    updateRecipe

} = require('../controllers/recipeController')
const router = express.Router()

//to get all recipes
router.get('/',getRecipes)

//get single recipe
router.get('/:id',getRecipe)

//post a new recipe
router.post('/',createRecipe)

//delete a recipe
router.delete('/:id',deleteRecipe)

//update a workout
router.patch('/:id',updateRecipe)

module.exports = router
