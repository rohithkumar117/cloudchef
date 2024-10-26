const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    process:{
        type: String,
        required: true
    },
    fullName: { // New field for storing the user's full name
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Recipe',recipeSchema)
