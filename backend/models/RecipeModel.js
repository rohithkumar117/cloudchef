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
    },
    userId: { // Add userId field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: { // New field for storing the image URL
        type: String,
        required: false
    }
},{ timestamps: true })

module.exports = mongoose.model('Recipe',recipeSchema)
