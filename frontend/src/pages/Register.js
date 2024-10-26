import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipesContext } from "../hooks/useRecipesContext";

const Register = () => {
    const { dispatch } = useRecipesContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // New state for success message

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { firstName, lastName, email, password };

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setSuccess(null); // Clear success message if there's an error
        }
        if (response.ok) {
            setSuccess("Registration successful. Now log in."); // Set success message
            setError(null); // Clear error message
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        }
    };

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h3>Register</h3>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Last Name:</label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
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
            <button>Register</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>} {/* Display success message */}
        </form>
    );
};

export default Register;
