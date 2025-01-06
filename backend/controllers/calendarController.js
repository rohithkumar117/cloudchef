const Calendar = require('../models/CalendarModel');
const mongoose = require('mongoose');

// Add a calendar entry
const addCalendarEntry = async (req, res) => {
    const userId = req.userId;
    const { recipeId, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(404).json({ error: 'Invalid user ID or recipe ID' });
    }

    try {
        const calendarEntry = await Calendar.create({ userId, recipeId, date });
        res.status(200).json(calendarEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all calendar entries
const getCalendarEntries = async (req, res) => {
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        const calendarEntries = await Calendar.find({ userId }).sort({ date: 1 });
        res.status(200).json(calendarEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addCalendarEntry,
    getCalendarEntries
};