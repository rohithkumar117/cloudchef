import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const { dispatch } = useRecipesContext();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [process, setProcess] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = { title, ingredients, process };

        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setTitle('');
            setIngredients('');
            setProcess('');
            setError(null);
            dispatch({ type: 'CREATE_RECIPE' });
            navigate('/welcome'); // Redirect to welcome page after adding recipe
        }
    };

    return (
        <div className="add-recipe-container">
            <form className="add-recipe-form" onSubmit={handleSubmit}>
                <h2>Add a New Recipe</h2>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                />
                <label>Process:</label>
                <textarea
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    required
                />
                <button type="submit">Add Recipe</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AddRecipe;
