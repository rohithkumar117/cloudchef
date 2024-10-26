import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const query = new URLSearchParams(location.search).get('query');
            try {
                const response = await fetch(`/api/recipes/search?query=${query}`);
                const data = await response.json();

                if (response.ok) {
                    setSearchResults(data);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    return (
        <div className="search-results">
            <h1>Search Results</h1>
            <div className="recipes">
                {searchResults.length > 0 ? (
                    searchResults.map((recipe) => (
                        <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="recipe-box">
                            <h4>{recipe.title}</h4>
                        </Link>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
