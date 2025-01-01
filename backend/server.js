require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // Import user routes
const calendarRoutes = require('./routes/calendar'); // Import calendar routes
const cartRoutes = require('./routes/cart'); // Import cart routes
const reportRoutes = require('./routes/reports'); // Import report routes
const app = express();

// Middleware
app.use(express.json());

// Routers
app.use('/api/recipes', recipeRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/calendar', calendarRoutes); // Use calendar routes
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api/reports', reportRoutes); // Use report routes

// Serve static files from recipeImages
app.use('/recipeImages', express.static('recipeImages'));

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
