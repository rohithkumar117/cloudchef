import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useNavigate } from 'react-router-dom';
import './SavedRecipes.css'; // Import the CSS file for styling

const SavedRecipes = () => {
    const { user } = useRecipesContext();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await fetch(`/api/users/${user.userId}/saved-recipes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setSavedRecipes(data);
                } else {
                    console.error('Failed to fetch saved recipes:', data.message);
                }
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, [user.userId]);

    const handleDelete = async (recipeId, e) => {
        e.stopPropagation(); // Prevent navigating to the recipe details page
        try {
            const response = await fetch('/api/users/delete-saved-recipe', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: user.userId, recipeId })
            });

            if (response.ok) {
                setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId));
                alert('Recipe removed from saved recipes successfully');
            } else {
                console.error('Failed to delete saved recipe');
            }
        } catch (error) {
            console.error('Error deleting saved recipe:', error);
        }
    };

    return (
        <div className="saved-recipes">
            <h1>Saved Recipes</h1>
            <div className="recipes-grid">
                {savedRecipes.length > 0 ? (
                    savedRecipes.map((recipe) => (
                        <div 
                            key={recipe._id} 
                            className="recipe-item" 
                            onClick={() => navigate(`/recipe/${recipe._id}`)}
                            style={{ cursor: 'pointer', textAlign: 'center', marginBottom: '20px' }}
                        >
                            {recipe.mainImage && (
                                <img src={`http://localhost:4000${recipe.mainImage}`} alt={recipe.title} style={{ width: '100%', borderRadius: '8px' }} />
                            )}
                            <h4>{recipe.title}</h4>
                            <button className="delete-btn" onClick={(e) => handleDelete(recipe._id, e)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No saved recipes available.</p>
                )}
            </div>
        </div>
    );
};

export default SavedRecipes;