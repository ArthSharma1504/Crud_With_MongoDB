const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config/passport');
require('dotenv').config();


const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Import routes:
const itemRoutes = require('./routes/item');
app.use('/api/items',itemRoutes);

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);



// Start the server:

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});


