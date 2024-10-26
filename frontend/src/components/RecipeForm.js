import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipesContext } from "../hooks/useRecipesContext"

const RecipeForm = ()=>{
    const{ dispatch } = useRecipesContext()
    const [title, setTitle]=useState('')
    const [ingredients, setIngredients]=useState('')
    const [process, setProcess]=useState('')
    const [error, setError]=useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const recipe = {title,ingredients,process}

        try {
            const response = await fetch('/api/recipes',{
                method: 'POST',
                body: JSON.stringify(recipe),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token
                }
            })

            const json=await response.json()

            if(!response.ok){
                console.error('Error response:', json);
                setError(json.error)
            } else {
                console.log('Success response:', json);
                setTitle('')
                setIngredients('')
                setProcess('')
                setError(null)
                dispatch({ type: 'CREATE_RECIPE', payload: json })
                setShowSuccessModal(true); // Show success modal
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('An error occurred while connecting to the server.')
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
