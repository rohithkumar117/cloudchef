import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRecipe.css'; // Import CSS for styling

const UpdateRecipe = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [process, setProcess] = useState('');
    const [image, setImage] = useState(null); // State for image
    const [error, setError] = useState(null);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false); // State for update success modal
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
                    setTitle(data.title);
                    setIngredients(data.ingredients);
                    setProcess(data.process);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch recipe details.');
            }
        };

        fetchRecipe();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('process', process);
        if (image) formData.append('image', image); // Append image file if it exists

        try {
            const response = await fetch(`/api/recipes/${id}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update the recipe');
            }

            setShowUpdateSuccess(true); // Show update success modal
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update the recipe.');
        }
    };

    const handleUpdateSuccess = () => {
        setShowUpdateSuccess(false);
        navigate('/my-recipes'); // Redirect to My Recipes page
    };

    return (
        <div className="update-recipe-container">
            <form className="update-recipe-form" onSubmit={handleSubmit}>
                <h2>Update Recipe</h2>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                />
                <label>Process:</label>
                <textarea
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    required
                />
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])} // Handle image file
                />
                <button type="submit">Update Recipe</button>
                {error && <div className="error">{error}</div>}
            </form>

            {showUpdateSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Update Successful</h4>
                        <button onClick={handleUpdateSuccess}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateRecipe;
