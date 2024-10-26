import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import RecipeDetails from '../components/RecipeDetails';

const Welcome = () => {
    const { user, recipes, dispatch } = useRecipesContext(); // Access user and recipes context
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredRecipes, setFilteredRecipes] = useState(recipes || []); // State for filtered recipes

    useEffect(() => {
        if (!recipes) {
            const fetchRecipes = async () => {
                const response = await fetch('/api/recipes');
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_RECIPES', payload: json });
                    setFilteredRecipes(json);
                }
            };

            fetchRecipes();
        } else {
            setFilteredRecipes(recipes);
        }
    }, [recipes, dispatch]);

    const handleSearch = () => {
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div className="welcome">
            <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1> {/* Check if user is defined */}
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
                {filteredRecipes && filteredRecipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-box">
                        <h4>{recipe.title}</h4>
                        <RecipeDetails recipe={recipe} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Welcome;
