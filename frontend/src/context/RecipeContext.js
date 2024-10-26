import { createContext, useReducer } from "react";

export const RecipesContext = createContext();

export const recipesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return {
                ...state,
                recipes: action.payload
            };
        case 'CREATE_RECIPE':
            return {
                ...state,
                recipes: [action.payload, ...state.recipes]
            };
        case 'DELETE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter((w) => w._id !== action.payload._id)
            };
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export const RecipesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipesReducer, {
        recipes: null,
        user: null // Ensure user is part of the initial state
    });

    return (
        <RecipesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipesContext.Provider>
    );
};
