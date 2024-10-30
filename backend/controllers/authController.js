const User = require('../models/UserModel'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '3d' });
};

// Example login function
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = createToken(user._id);

        // Include user ID in the response
        res.status(200).json({ 
            email: user.email, 
            token, 
            firstName: user.firstName, 
            lastName: user.lastName,
            userId: user._id // Add userId to the response
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    const token = createToken(user._id);
    res.status(201).json({ email: user.email, token });
};

module.exports = { loginUser, registerUser };
