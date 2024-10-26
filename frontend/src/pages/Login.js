import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipesContext } from "../hooks/useRecipesContext";

const Login = () => {
    const { dispatch } = useRecipesContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };

        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setSuccess(null);
        }
        if (response.ok) {
            // Assuming the response contains the token
            localStorage.setItem('token', json.token);
            dispatch({ type: 'LOGIN', payload: json });
            setSuccess("Login successful.");
            setError(null);
            setTimeout(() => navigate('/welcome'), 2000);
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button>Login</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    );
};

export default Login;
