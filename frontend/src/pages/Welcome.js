import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { Link, useNavigate } from 'react-router-dom';

const Welcome = () => {
    const { user, dispatch } = useRecipesContext();
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('/api/recipes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setRecipes(data);
                    dispatch({ type: 'SET_RECIPES', payload: data });
                } else {
                    console.error('Failed to fetch recipes:', data.message);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [dispatch]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const handleAddRecipe = () => {
        navigate('/add-recipe');
    };

    return (
        <div className="welcome-container">
            <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1>
            <p>Explore and share your favorite recipes.</p>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="button-group">
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={handleAddRecipe}>Add Recipe</button>
                </div>
            </div>
            <div className="recipes-grid">
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

export default Welcome;
