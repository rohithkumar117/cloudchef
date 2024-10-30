import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const MyRecipes = () => {
    const { user, dispatch } = useRecipesContext();
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            if (!user || !user.userId) {
                console.error('User ID is not available');
                return;
            }

            console.log('Fetching recipes for user ID:', user.userId);

            try {
                const response = await fetch(`/api/recipes/user/${user.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched recipes:', data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, [user]);

    const handleRecipeClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div className="my-recipes">
            <BackButton />
            <h1>My Recipes</h1>
            <div className="recipes">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div 
                            key={recipe._id} 
                            className="recipe-box" 
                            onClick={() => handleRecipeClick(recipe._id)}
                        >
                            <h4>{recipe.title}</h4>
                        </div>
                    ))
                ) : (
                    <p>No recipes available.</p>
                )}
            </div>
        </div>
    );
};

export default MyRecipes;
