const express = require('express');
const { addCalendarEntry, getCalendarEntries } = require('../controllers/calendarController');
const requireAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth); // Apply auth middleware to all routes

// POST add a calendar entry
router.post('/', addCalendarEntry);

// GET all calendar entries
router.get('/', getCalendarEntries);

module.exports = router;