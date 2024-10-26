import { useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

const RecipeForm = ()=>{
    const{ dispatch, user } = useRecipesContext()

    const [title, setTitle]=useState('')
    const [ingredients, setIngredients]=useState('')
    const [process, setProcess]=useState('')
    const [error, setError]=useState(null)
    const [emptyFields, setEmptyFields]=useState([]) // Initialize as an empty array
    const [success, setSuccess]=useState(null) // State for success message

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const recipe = {title,ingredients,process}

        //fetching from backend
        const response = await fetch('/api/recipes',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is retrieved correctly
            },
            body: JSON.stringify(recipe)
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields || []) // Ensure it's always an array
            setSuccess(null); // Clear success message on error
        }
        if(response.ok){
            setTitle('')
            setIngredients('')
            setProcess('')
            setError(null)
            setEmptyFields([])
            setSuccess('Recipe added successfully!'); // Set success message
            console.log('New Recipe Added',json)
            dispatch({type: 'CREATE_RECIPE',payload:json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add A New Recipe</h3>
            <label>Recipe Title:</label>
            <input 
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title')?'error':''}
            />

            <label>Ingredients:</label>
            <input 
                type="text"
                onChange={(e)=> setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients')?'error':''}
            />

            <label>Process:</label>
            <input 
                type="text"
                onChange={(e)=> setProcess(e.target.value)}
                value={process}
                className={emptyFields.includes('process')?'error':''}
            />
            
            <button>Add Recipe</button>
            {error && <div className="error">{error }</div>}
            {success && <div className="success">{success}</div>} {/* Display success message */}
        </form>
    )
}

export default RecipeForm
