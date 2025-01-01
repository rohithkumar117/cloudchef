import { useEffect, useState } from "react"
import { useRecipesContext } from "../hooks/useRecipesContext"
import { useNavigate } from "react-router-dom"
import BackButton from '../components/BackButton'; // Import the BackButton component

//components 

import RecipeDetails from '../components/RecipeDetailsComponent'
import RecipeForm from '../components/RecipeForm'


const Home = ()=>{
    const {recipes,dispatch}=useRecipesContext()    
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredRecipes, setFilteredRecipes] = useState([]); // State for filtered recipes
    const navigate = useNavigate(); // Add useNavigate hook

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

    const handleAddRecipe = () => {
        navigate('/add-recipe'); // Navigate to AddRecipe page
    };

    return (
        <div className="home">
            <BackButton /> {/* Add the BackButton component here */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleAddRecipe} style={{ marginLeft: '10px' }}>Add Recipe</button> {/* Add button with margin */}
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
