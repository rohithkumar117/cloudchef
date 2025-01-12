import React, { useState } from 'react';
import './GenerateRecipe.css'; // Import the CSS file for styling

const GenerateRecipe = () => {
    const [ingredients, setIngredients] = useState('');
    const [generatedRecipe, setGeneratedRecipe] = useState('');
    const [error, setError] = useState(null);

    const handleGenerateRecipe = async () => {
        try {
            const response = await fetch('/api/recipes/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ ingredients: ingredients.split(',').map(ing => ing.trim()) })
            });

            const data = await response.json();
            if (response.ok) {
                setGeneratedRecipe(data.recipe);
                setError(null);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Failed to generate recipe');
        }
    };

    return (
        <div className="generate-recipe">
            <h1>Generate Recipe</h1>
            <textarea
                placeholder="Enter ingredients, separated by commas"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={handleGenerateRecipe}>Generate Recipe</button>
            {error && <p className="error">{error}</p>}
            {generatedRecipe && (
                <div className="generated-recipe">
                    <h2>Generated Recipe</h2>
                    <p>{generatedRecipe}</p>
                </div>
            )}
        </div>
    );
};

export default GenerateRecipe;