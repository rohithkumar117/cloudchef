import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipes/${id}`);
            const data = await response.json();
            if (response.ok) {
                setRecipe(data);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details">
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Process:</strong> {recipe.process}</p>
            <p><strong>Created by:</strong> {recipe.fullName}</p>
            <p><strong>Date:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default RecipeDetails;
