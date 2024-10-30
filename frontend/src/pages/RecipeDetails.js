import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css'; // Import CSS for styling

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false); // State for update success modal
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false); // State for delete success modal
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

            setShowDeleteSuccess(true); // Show delete success modal
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleUpdate = () => {
        navigate(`/update-recipe/${id}`);
    };

    const handleUpdateSuccess = () => {
        setShowUpdateSuccess(false);
        navigate(`/recipe/${id}`);
    };

    const handleDeleteSuccess = () => {
        setShowDeleteSuccess(false);
        navigate('/my-recipes');
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

            {showUpdateSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Update Successful</h4>
                        <button onClick={handleUpdateSuccess}>OK</button>
                    </div>
                </div>
            )}

            {showDeleteSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Delete Successful</h4>
                        <button onClick={handleDeleteSuccess}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;
