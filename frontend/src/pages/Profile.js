import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';

const Profile = () => {
    const { user, dispatch } = useRecipesContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="profile">
            <h2>Account Information</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="logout" onClick={handleLogout}>Logout</button> {/* Apply the new CSS class */}
        </div>
    );
};

export default Profile;
