import { useEffect, useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"

//components 

import RecipeDetails from '../components/RecipeDetails'
import RecipeForm from '../components/RecipeForm'


const Home = ()=>{
    const {recipes,dispatch}=useRecipesContext()    
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredRecipes, setFilteredRecipes] = useState([]); // State for filtered recipes

    useEffect(()=>{
        const fetchRecipes = async () =>{
            const response = await fetch('/api/recipes')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_RECIPES',payload:json})
                setFilteredRecipes(json); // Initialize filtered recipes
            }
        }

        fetchRecipes()
    },[dispatch])

    const handleSearch = () => {
        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    };

    return (
        <div className="home">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="workouts">
                {filteredRecipes && filteredRecipes.map((recipe)=>(
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
            <RecipeForm />
        </div>
     )
}

export default Home 
