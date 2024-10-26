import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await fetch('/api/recipes/my-recipes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, []);

    return (
        <div className="my-recipes">
            <h1>My Recipes</h1>
            <div className="recipes">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="recipe-box">
                            <h4>{recipe.title}</h4>
                        </Link>
                    ))
                ) : (
                    <p>No recipes available.</p>
                )}
            </div>
        </div>
    );
};

export default MyRecipes;
