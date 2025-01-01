import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// pages and components 
import Home from './pages/home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeForm from './components/RecipeForm';
import MyRecipes from './pages/MyRecipes';
import UpdateRecipe from './pages/UpdateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/welcome" element={<Layout><Welcome /></Layout>} />
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/recipe/:id" element={<Layout><RecipeDetails /></Layout>} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/add-recipe" element={<Layout><RecipeForm /></Layout>} />
            <Route path="/my-recipes" element={<Layout><MyRecipes /></Layout>} />
            <Route path="/update-recipe/:id" element={<Layout><UpdateRecipe /></Layout>} />
            <Route path="/saved-recipes" element={<Layout><SavedRecipes /></Layout>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
