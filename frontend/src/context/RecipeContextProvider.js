import React, { createContext, useReducer } from 'react';
import { recipesReducer, initialState } from './RecipeContext';

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipesReducer, initialState);

    return (
        <RecipesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipesContext.Provider>
    );
};
