const User = require('../models/UserModel'); // Assuming you have a User model
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Ensure the response includes the last name
    res.status(200).json({ 
        email: user.email, 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName // Include last name
    });
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

    res.status(201).json({ email: user.email, id: user._id, firstName: user.firstName });
};

module.exports = { loginUser, registerUser };
