import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components 
import Home from './pages/home';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component
import Welcome from './pages/Welcome'; // Import the Welcome component
import LandingPage from './pages/LandingPage'; // Import the LandingPage component
import Profile from './pages/Profile'; // Import the Profile component

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/home" element={<Home />} /> {/* Add a route for Home if needed */}
            <Route path="/profile" element={<Profile />} /> {/* Add the profile route */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
