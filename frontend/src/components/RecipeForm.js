import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from "../hooks/useRecipesContext";
import './RecipeForm.css'; // Import CSS file for styling

const RecipeForm = () => {
    const { dispatch } = useRecipesContext();
    const navigate = useNavigate();

    // State variables for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [totalTimeHours, setTotalTimeHours] = useState(0);
    const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', alternate: [] }]);
    const [nutritionCalories, setNutritionCalories] = useState(0);
    const [nutritionFat, setNutritionFat] = useState(0);
    const [nutritionProtein, setNutritionProtein] = useState(0);
    const [nutritionCarbs, setNutritionCarbs] = useState(0);
    const [steps, setSteps] = useState([{ stepNumber: 1, text: '', ingredients: [], timer: 0 }]);
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null); // State for image
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate numeric inputs
        if (isNaN(totalTimeHours) || isNaN(totalTimeMinutes) || isNaN(nutritionCalories) || isNaN(nutritionFat) || isNaN(nutritionProtein) || isNaN(nutritionCarbs)) {
            setError('Please enter valid numeric values for total time and nutrition fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('totalTime[hours]', totalTimeHours);
        formData.append('totalTime[minutes]', totalTimeMinutes);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('nutrition[calories]', nutritionCalories);
        formData.append('nutrition[fat]', nutritionFat);
        formData.append('nutrition[protein]', nutritionProtein);
        formData.append('nutrition[carbs]', nutritionCarbs);
        formData.append('steps', JSON.stringify(steps));
        formData.append('tags', JSON.stringify(tags));
        if (image) formData.append('mainImage', image); // Append image file

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the response as text
                console.error('Error response:', errorText);
                setError('An error occurred while processing your request.');
                return;
            }

            const json = await response.json();
            setTitle('');
            setDescription('');
            setTotalTimeHours(0);
            setTotalTimeMinutes(0);
            setIngredients([{ name: '', quantity: '', alternate: [] }]);
            setNutritionCalories(0);
            setNutritionFat(0);
            setNutritionProtein(0);
            setNutritionCarbs(0);
            setSteps([{ stepNumber: 1, text: '', ingredients: [], timer: 0 }]);
            setTags([]);
            setImage(null);
            setError(null);
            dispatch({ type: 'CREATE_RECIPE', payload: json });
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('An error occurred while connecting to the server.');
        }
    };

    const handleOkClick = () => {
        setShowSuccessModal(false);
        navigate('/welcome'); // Redirect to welcome page after acknowledging success
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', alternate: [] }]);
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { stepNumber: steps.length + 1, text: '', ingredients: [], timer: 0 }]);
    };

    const handleDeleteStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    return (
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
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Total Time:</label>
                <div className="total-time-inputs">
                    <input
                        type="number"
                        placeholder="Hours"
                        value={totalTimeHours}
                        onChange={(e) => setTotalTimeHours(parseInt(e.target.value, 10))}
                        required
                    />
                    <span>Hours</span>
                    <input
                        type="number"
                        placeholder="Minutes"
                        value={totalTimeMinutes}
                        onChange={(e) => setTotalTimeMinutes(parseInt(e.target.value, 10))}
                        required
                    />
                    <span>Minutes</span>
                </div>
                <h3>Ingredients:</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
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
                        <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
                <h3>Nutrition:</h3>
                <div className="nutrition-section">
                    <label>Calories:</label>
                    <input
                        type="number"
                        placeholder="Calories"
                        value={nutritionCalories}
                        onChange={(e) => setNutritionCalories(parseInt(e.target.value, 10))}
                        required
                    />
                    <label>Fat:</label>
                    <input
                        type="number"
                        placeholder="Fat (g)"
                        value={nutritionFat}
                        onChange={(e) => setNutritionFat(parseInt(e.target.value, 10))}
                        required
                    />
                    <label>Protein:</label>
                    <input
                        type="number"
                        placeholder="Protein (g)"
                        value={nutritionProtein}
                        onChange={(e) => setNutritionProtein(parseInt(e.target.value, 10))}
                        required
                    />
                    <label>Carbs:</label>
                    <input
                        type="number"
                        placeholder="Carbs (g)"
                        value={nutritionCarbs}
                        onChange={(e) => setNutritionCarbs(parseInt(e.target.value, 10))}
                        required
                    />
                </div>
                <h3>Steps:</h3>
                {steps.map((step, index) => (
                    <div key={index} className="step-item">
                        <textarea
                            placeholder="Step description"
                            value={step.text}
                            onChange={(e) => handleStepChange(index, 'text', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Ingredients (comma separated)"
                            value={step.ingredients.join(', ')}
                            onChange={(e) => handleStepChange(index, 'ingredients', e.target.value.split(', '))}
                        />
                        <input
                            type="number"
                            placeholder="Timer (minutes)"
                            value={step.timer}
                            onChange={(e) => handleStepChange(index, 'timer', parseInt(e.target.value, 10))}
                        />
                        <button type="button" onClick={() => handleDeleteStep(index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddStep}>Add Step</button>
                <label>Tags:</label>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(', '))}
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
    );
};

export default RecipeForm;
