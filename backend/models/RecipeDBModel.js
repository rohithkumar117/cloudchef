const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
    number: Number,
    instruction: String,
    timer: Number,
    image: String // Store image path or URL
});

const recipeDBSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    steps: [stepSchema], // Include steps as an array of stepSchema
    fullName: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('RecipeDB', recipeDBSchema);
