import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../hooks/useRecipesContext';
import './Cart.css';

const Cart = () => {
    const { user } = useRecipesContext();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user || !user.userId) {
                console.error('User ID is not available');
                return;
            }

            try {
                const response = await fetch(`/api/cart`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCartItems(data.items);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [user]);

    const handleDelete = async (ingredientId) => {
        try {
            const response = await fetch(`/api/cart/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ingredientId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setCartItems(cartItems.filter(item => item._id !== ingredientId));
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    const handleQuantityChange = (ingredientId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent quantity from going below 1

        setCartItems(cartItems.map(item =>
            item._id === ingredientId ? { ...item, quantity: newQuantity } : item
        ));
    };

    return (
        <div className="cart">
            <h1>My Cart</h1>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ingredient}</td>
                                <td>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                                        <span className="material-icons">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No items in the cart.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Cart;