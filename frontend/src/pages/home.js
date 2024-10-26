import { useEffect } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

//components 

import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'


const Home = ()=>{
    const {recipes,dispatch}=useRecipesContext()    

    useEffect(()=>{
        const fetchRecipes = async () =>{
            const response = await fetch('/api/recipes')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_RECIPES',payload:json})
            }
        }

        fetchRecipes()
    },[dispatch])

     return (
        <div className="home">
            <div className="workouts">
                {recipes && recipes.map((recipe)=>(
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
            <RecipeForm />
        </div>
     )
}

export default Home 