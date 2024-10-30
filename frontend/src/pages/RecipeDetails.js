import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css'; // Import CSS for styling

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
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
                    setRecipe(data);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch recipe details.');
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete the recipe');
            }

            navigate('/my-recipes');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleUpdate = () => {
        navigate(`/update-recipe/${id}`);
    };

    if (error) return <div>{error}</div>;
    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details">
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Process:</strong> {recipe.process}</p>
            <p><strong>Created by:</strong> {recipe.fullName}</p>
            <p><strong>Date:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>
            <div className="button-group">
                <button className="btn update-btn" onClick={handleUpdate}>Update</button>
                <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default RecipeDetails;
