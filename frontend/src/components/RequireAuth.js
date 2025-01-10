import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';

const RequireAuth = ({ children }) => {
    const { user } = useRecipesContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RequireAuth;