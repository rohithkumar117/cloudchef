import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';
import './RecipeDetails.css'; // Import the CSS file

const RecipeDetails = () => {
    const { id } = useParams();
    const { user, dispatch } = useRecipesContext();
    const [recipe, setRecipe] = useState(null);
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
                    console.error('Failed to fetch recipe:', data.message);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
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

            if (response.ok) {
                dispatch({ type: 'DELETE_RECIPE', payload: id });
                navigate('/my-recipes');
            } else {
                console.error('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div className="recipe-details">
            <h2>{recipe.title}</h2>
            <div className="recipe-info">
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Process:</strong> {recipe.process}</p>
                <p><strong>Created by:</strong> {recipe.fullName}</p>
                <p><strong>Created on:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>
            </div>
            {user && user.userId === recipe.userId && (
                <div className="button-group">
                    <button className="btn update-btn" onClick={() => navigate(`/update-recipe/${recipe._id}`)}>Update</button>
                    <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;
