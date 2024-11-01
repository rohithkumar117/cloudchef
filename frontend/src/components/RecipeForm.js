import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipesContext } from "../hooks/useRecipesContext"

const RecipeForm = ()=>{
    const{ dispatch } = useRecipesContext()
    const [title, setTitle]=useState('')
    const [ingredients, setIngredients]=useState('')
    const [process, setProcess]=useState('')
    const [image, setImage] = useState(null); // Add state for image
    const [error, setError]=useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        formData.append('process', process);
        if (image) formData.append('image', image); // Append image file

        try {
            const response = await fetch('/api/recipes',{
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!response.ok) {
                const errorText = await response.text(); // Read the response as text
                console.error('Error response:', errorText);
                setError('An error occurred while processing your request.');
                return;
            }

            const json = await response.json();
            setTitle('');
            setIngredients('');
            setProcess('');
            setImage(null);
            setError(null);
            dispatch({ type: 'CREATE_RECIPE', payload: json });
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('An error occurred while connecting to the server.');
        }
    }

    const handleOkClick = () => {
        setShowSuccessModal(false);
        navigate('/welcome'); // Redirect to welcome page after acknowledging success
    };

    return(
        <div className="recipe-form-container">
            <form className="recipe-form" onSubmit={handleSubmit}>
                <h2>Add a New Recipe</h2>
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
                <button type="submit">Add Recipe</button>
                {error && <div className="error">{error}</div>}
            </form>

            {showSuccessModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Recipe Created Successfully</h4>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RecipeForm
