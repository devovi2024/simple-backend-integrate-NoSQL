const express = require('express');
const connectDB = require('./database/config');
const productRoutes = require('./routes/api.js');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

// Enable CORS for all routes
app.use(cors()); // <-- Enable CORS

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api', productRoutes); // <-- Keep this to access routes like /api/products

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
