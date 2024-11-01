import React, { createContext, useReducer, useEffect } from 'react';
import { recipesReducer, initialState } from './RecipeContext';

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipesReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you can decode the token to get user info
            // For simplicity, assume you have a function decodeToken
            const user = decodeToken(token);
            dispatch({ type: 'LOGIN', payload: { ...user, token } });
        }
    }, []);

    return (
        <RecipesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipesContext.Provider>
    );
};
