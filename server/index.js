const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.method === 'POST' || req.method === 'PATCH') {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
const userRoutes = require('./routes/users');
const contentRoutes = require('./routes/content');

app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

app.get('/', (req, res) => {
    res.send('Maths Club API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
