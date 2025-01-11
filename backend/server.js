require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const calendarRoutes = require('./routes/calendar');
const cartRoutes = require('./routes/cart');
const reportRoutes = require('./routes/reports');
const app = express();

// Middleware
app.use(cors({
  origin: 'https://cloudchef-frontend.vercel.app',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use('/profilePhotos', express.static(path.join(__dirname, 'profilePhotos')));

// Routers
app.use('/api/recipes', recipeRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/calendar', calendarRoutes); // Use calendar routes
app.use('/api/cart', cartRoutes);
app.use('/api/reports', reportRoutes);

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
