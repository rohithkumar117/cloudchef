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
                const response = await fetch('/api/recipes');
                const data = await response.json();

                if (response.ok) {
                    setRecipes(data);
                    dispatch({ type: 'SET_RECIPES', payload: data });
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

    return (
        <div className="welcome">
            <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1>
            <p>Explore and share your favorite recipes.</p>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
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

export default Welcome;
