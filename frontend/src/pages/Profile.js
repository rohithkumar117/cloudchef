import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';

const Profile = () => {
    const { user, dispatch } = useRecipesContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <div className="profile">
            <h2>Account Information</h2>
            <p><strong>First Name:</strong> {user?.firstName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {user?.lastName || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
