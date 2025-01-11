import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateRecipe.css'; // Import CSS for styling

const UpdateRecipe = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [totalTime, setTotalTime] = useState({ hours: 0, minutes: 0 });
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', alternate: [] }]);
    const [nutrition, setNutrition] = useState({ calories: 0, fat: 0, protein: 0, carbs: 0 });
    const [steps, setSteps] = useState([{ stepNumber: 1, text: '', ingredients: [], timer: 0 }]);
    const [tags, setTags] = useState([]);
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
                    setDescription(data.description);
                    setTotalTime(data.totalTime);
                    setIngredients(data.ingredients);
                    setNutrition(data.nutrition);
                    setSteps(data.steps);
                    setTags(data.tags);
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
        formData.append('description', description);
        formData.append('totalTime[hours]', totalTime.hours);
        formData.append('totalTime[minutes]', totalTime.minutes);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('nutrition[calories]', nutrition.calories);
        formData.append('nutrition[fat]', nutrition.fat);
        formData.append('nutrition[protein]', nutrition.protein);
        formData.append('nutrition[carbs]', nutrition.carbs);
        formData.append('steps', JSON.stringify(steps));
        formData.append('tags', JSON.stringify(tags));
        if (image) formData.append('mainImage', image); // Append image file if it exists

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
            setError(error.message || 'Failed to update the recipe.');
        }
    };

    const handleUpdateSuccess = () => {
        setShowUpdateSuccess(false);
        navigate('/my-recipes'); // Redirect to My Recipes page
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', alternate: [] }]);
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { stepNumber: steps.length + 1, text: '', ingredients: [], timer: 0 }]);
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
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Total Time:</label>
                <input
                    type="number"
                    placeholder="Hours"
                    value={totalTime.hours}
                    onChange={(e) => setTotalTime({ ...totalTime, hours: parseInt(e.target.value, 10) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Minutes"
                    value={totalTime.minutes}
                    onChange={(e) => setTotalTime({ ...totalTime, minutes: parseInt(e.target.value, 10) })}
                    required
                />
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Alternate (comma separated)"
                            value={ingredient.alternate.join(', ')}
                            onChange={(e) => handleIngredientChange(index, 'alternate', e.target.value.split(', '))}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                <label>Nutrition:</label>
                <input
                    type="number"
                    placeholder="Calories"
                    value={nutrition.calories}
                    onChange={(e) => setNutrition({ ...nutrition, calories: parseInt(e.target.value, 10) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Fat"
                    value={nutrition.fat}
                    onChange={(e) => setNutrition({ ...nutrition, fat: parseInt(e.target.value, 10) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Protein"
                    value={nutrition.protein}
                    onChange={(e) => setNutrition({ ...nutrition, protein: parseInt(e.target.value, 10) })}
                    required
                />
                <input
                    type="number"
                    placeholder="Carbs"
                    value={nutrition.carbs}
                    onChange={(e) => setNutrition({ ...nutrition, carbs: parseInt(e.target.value, 10) })}
                    required
                />
                <label>Steps:</label>
                {steps.map((step, index) => (
                    <div key={index}>
                        <textarea
                            placeholder="Step Text"
                            value={step.text}
                            onChange={(e) => handleStepChange(index, 'text', e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Timer"
                            value={step.timer}
                            onChange={(e) => handleStepChange(index, 'timer', parseInt(e.target.value, 10))}
                            required
                        />
                        {step.image && <img src={`${process.env.REACT_APP_BASE_URL}${step.image}`} alt={`Step ${step.stepNumber}`} className="step-image" />}
                    </div>
                ))}
                <button type="button" onClick={handleAddStep}>Add Step</button>
                <label>Tags:</label>
                <input
                    type="text"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
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
