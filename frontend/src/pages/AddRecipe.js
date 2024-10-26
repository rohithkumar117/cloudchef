import React, { useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const { dispatch, user } = useRecipesContext();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState([{ number: 1, instruction: '', timer: '', image: null }]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddStep = () => {
        setSteps([...steps, { number: steps.length + 1, instruction: '', timer: '', image: null }]);
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = steps.map((step, i) => i === index ? { ...step, [field]: value } : step);
        setSteps(newSteps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('ingredients', ingredients);
        steps.forEach((step, index) => {
            formData.append(`steps[${index}][number]`, step.number);
            formData.append(`steps[${index}][instruction]`, step.instruction);
            formData.append(`steps[${index}][timer]`, step.timer);
            if (step.image) {
                formData.append(`steps[${index}][image]`, step.image);
            }
        });

        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}` // Assuming JWT is used
            }
        });

        if (response.ok) {
            setTitle('');
            setIngredients('');
            setSteps([{ number: 1, instruction: '', timer: '', image: null }]);
            setError(null);
            dispatch({ type: 'CREATE_RECIPE' });
            navigate('/welcome'); // Redirect to welcome page after adding recipe
        } else {
            setError(response.statusText);
        }
    };

    return (
        <div className="add-recipe-page">
            <h2>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>Recipe Title:</label>
                <input
                    type="text"
                    placeholder="Enter recipe title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Ingredients:</label>
                <textarea
                    placeholder="Enter ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <h3>Steps</h3>
                {steps.map((step, index) => (
                    <div key={index} className="step">
                        <label>Step {step.number}:</label>
                        <input
                            type="text"
                            placeholder="Instruction"
                            value={step.instruction}
                            onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Timer (minutes)"
                            value={step.timer}
                            onChange={(e) => handleStepChange(index, 'timer', e.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(e) => handleStepChange(index, 'image', e.target.files[0])}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddStep}>Add Step</button>
                <button type="submit">Add Recipe</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AddRecipe;
