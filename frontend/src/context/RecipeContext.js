import { createContext, useReducer } from "react";

export const RecipesContext = createContext();

export const recipesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return {
                ...state,
                recipes: action.payload // Ensure payload is an array
            };
        case 'CREATE_RECIPE':
            return {
                ...state,
                recipes: [action.payload, ...state.recipes] // Add new recipe to the array
            };
        case 'DELETE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter((w) => w._id !== action.payload._id)
            };
        case 'LOGIN':
            console.log('LOGIN action payload:', action.payload); // Debug: Log the payload
            return {
                ...state,
                user: action.payload // Ensure payload includes firstName and lastName
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
        recipes: [], // Initialize as an empty array
        user: null
    });

    return (
        <RecipesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipesContext.Provider>
    );
};
