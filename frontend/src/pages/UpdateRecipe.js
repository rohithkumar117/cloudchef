import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRecipe.css'; // Import CSS for styling

const UpdateRecipe = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [process, setProcess] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setTitle(data.title);
                    setIngredients(data.ingredients);
                    setProcess(data.process);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch recipe details.');
            }
        };

        fetchRecipe();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRecipe = { title, ingredients, process };

        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedRecipe),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update the recipe');
            }

            const updatedData = await response.json();
            console.log('Updated recipe:', updatedData); // Debug: Log the updated recipe
            navigate(`/recipe/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update the recipe.');
        }
    };

    return (
        <div className="update-recipe-container">
            <form className="update-recipe-form" onSubmit={handleSubmit}>
                <h2>Update Recipe</h2>
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
                <button type="submit">Update Recipe</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default UpdateRecipe;
