const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const updates = { firstName, lastName, email, phoneNumber };
    if (password) {
        updates.password = await bcrypt.hash(password, 10);
    }

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { updateUserProfile };
