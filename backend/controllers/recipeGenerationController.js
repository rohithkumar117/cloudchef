const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const generateRecipe = async (req, res) => {
    const { ingredients, servingSize, cuisine, difficulty, dietaryPreferences } = req.body;

    try {
        const input = `Generate a recipe with the following details:
Ingredients: ${ingredients.join(', ')}
Serving Size: ${servingSize}
Cuisine: ${cuisine}
Difficulty: ${difficulty}
Dietary Preferences: ${dietaryPreferences}
Instructions:`;

        const response = await hf.textGeneration({
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            inputs: input,
            parameters: {
                max_length: 200, // Limit the output length
                num_return_sequences: 1,
                temperature: 0.7,
                top_p: 0.9
            }
        });

        let recipeText = response.generated_text;

        if (!recipeText) {
            return res.status(500).json({ error: 'Failed to generate recipe text' });
        }

        const recipeNameMatch = recipeText.match(/Enjoy your (.*)!/);
        const ingredientsListMatch = recipeText.match(/Ingredients: ([\s\S]*?)\n\n/);
        const stepsTextMatch = recipeText.match(/Instructions:\n\n([\s\S]*)/);

        if (!recipeNameMatch || !ingredientsListMatch || !stepsTextMatch) {
            return res.status(500).json({ error: 'Failed to parse generated recipe text' });
        }

        const recipeName = recipeNameMatch[1].trim();
        const ingredientsList = ingredientsListMatch[1].trim();
        const stepsText = stepsTextMatch[1].trim();

        // Further clean up the steps to remove repeated instructions
        const steps = stepsText.split('\n').map((step, index) => ({
            stepNumber: index + 1,
            text: step.trim(),
            timer: 5 // Placeholder timer
        })).filter(step => step.text !== '');

        const formattedRecipe = {
            recipeName,
            totalTime: 'N/A', // Placeholder total time
            ingredientsList,
            nutrition: 'N/A', // Placeholder nutrition
            steps
        };

        res.status(200).json({ recipe: formattedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateRecipe };