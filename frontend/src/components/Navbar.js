import { Link } from 'react-router-dom'
import { useRecipesContext } from '../hooks/useRecipesContext'

const Navbar = () => {
    const { user } = useRecipesContext()

    return (
        <header>
            <div className="container">
                <Link to={user ? "/welcome" : "/"}> {/* Conditional link based on user status */}
                    <h1>Cloud Chef</h1> {/* Display only the company name */}
                </Link>
                {user && ( // Only show "My Profile" if logged in
                    <div>
                        <Link to="/profile">My Profile</Link> {/* Link to the profile page */}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
