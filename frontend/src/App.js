import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component

// pages and components 
import Home from './pages/home';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component
import Welcome from './pages/Welcome'; // Import the Welcome component
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Profile from './pages/Profile'; // Import the Profile component
import RecipeDetails from './pages/RecipeDetails'; // Import the RecipeDetails component
import SearchResults from './pages/SearchResults'; // Import the SearchResults component
import RecipeForm from './components/RecipeForm'; // Import RecipeForm

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Ensure Navbar is included here */}
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} /> {/* Set LandingPage as the default route */}
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/welcome" element={<Layout><Welcome /></Layout>} />
            <Route path="/home" element={<Layout><Home /></Layout>} /> {/* Add a route for Home if needed */}
            <Route path="/profile" element={<Layout><Profile /></Layout>} /> {/* Add the profile route */}
            <Route path="/recipe/:id" element={<Layout><RecipeDetails /></Layout>} /> {/* Ensure this route is present */}
            <Route path="/search" element={<Layout><SearchResults /></Layout>} /> {/* Add this route */}
            <Route path="/add-recipe" element={<Layout><RecipeForm /></Layout>} /> {/* Add this route */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
