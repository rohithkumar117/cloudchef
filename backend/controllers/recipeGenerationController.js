const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');

dotenv.config();

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const generateRecipe = async (req, res) => {
    const { ingredients } = req.body;

    try {
        const input = `Ingredients: ${ingredients.join(', ')}`;
        const response = await hf.textGeneration({
            model: 'flax-community/t5-recipe-generation',
            inputs: input,
        });

        const recipe = response.generated_text;
        res.status(200).json({ recipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateRecipe };