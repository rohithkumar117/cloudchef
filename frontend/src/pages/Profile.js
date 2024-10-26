import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';

const Profile = () => {
    const { user, dispatch } = useRecipesContext();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        setShowLogoutModal(true);
    };

    const handleOkClick = () => {
        setShowLogoutModal(false);
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Account Information</h2>
                <div className="profile-info">
                    <p><strong>First Name:</strong> {user?.firstName || 'N/A'}</p>
                    <p><strong>Last Name:</strong> {user?.lastName || 'N/A'}</p>
                    <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            {showLogoutModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Logout Successful</h4>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
