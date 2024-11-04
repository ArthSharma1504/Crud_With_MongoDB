const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=>{
    console.log("Connect to MongoDB");
}).catch(err => console.log(err));

// Start the server:

app.listen(PORT, ()=>{
    console.log(`The Server is running on http://localhost:${PORT}`);
});


