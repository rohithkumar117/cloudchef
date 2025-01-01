import { Link } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';

const Navbar = () => {
    const { user } = useRecipesContext();

    return (
        <header>
            <div className="container">
                <Link to={user ? "/welcome" : "/"}>
                    <h1>Cloud Chef</h1>
                </Link>
                {user && (
                    <div>
                        <Link to="/profile">My Profile</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
