require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Recipe = require('./models/RecipeModel'); // Corrected path

const recipeImagesPath = path.join(__dirname, 'recipeImages');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to DB');

        // Get all images referenced in the database
        const recipes = await Recipe.find({});
        const referencedImages = recipes.map(recipe => recipe.mainImage).filter(Boolean);

        // Get all images in the recipeImages folder
        fs.readdir(recipeImagesPath, (err, files) => {
            if (err) {
                console.error('Error reading recipeImages folder:', err);
                return;
            }

            // Find images that are not referenced in the database
            const unusedImages = files.filter(file => !referencedImages.includes(`/recipeImages/${file}`));

            // Delete unused images
            unusedImages.forEach(file => {
                const filePath = path.join(recipeImagesPath, file);
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error('Error deleting file:', filePath, err);
                    } else {
                        console.log('Deleted unused image:', filePath);
                    }
                });
            });
        });
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
    })
    .finally(() => {
        mongoose.connection.close();
    });