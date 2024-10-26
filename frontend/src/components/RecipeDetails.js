import { useRecipesContext } from '../hooks/useRecipesContext'

// date fns  
import formatDistanceToNow from 'date-fns/formatDistanceToNow'   
const RecipeDetails = ({recipe}) =>{
    const{ dispatch } = useRecipesContext()
    const handleClick = async ()=>{
        const response = await fetch ('/api/recipes/'+ recipe._id,{
            method:'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_RECIPE',payload: json})
        }
    }
    return(
        <div className="workout-details">
            <h4>{recipe.title}</h4>
            <p><strong>ingredients :</strong>{recipe.ingredients}</p>
            <p><strong>process :</strong>{recipe.process}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt),{ addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default RecipeDetails