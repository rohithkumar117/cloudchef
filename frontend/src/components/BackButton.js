import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            navigate('/'); // Navigate to LandingPage
        } else {
            navigate(-1); // Navigate to the previous page
        }
    };

    return (
        <button onClick={handleBack} style={{ margin: '10px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Back
        </button>
    );
};

export default BackButton;
