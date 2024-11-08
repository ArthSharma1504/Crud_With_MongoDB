const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// route for registration

router.post('/register', async(req,res)=>{
    try{
        const {email,password} = req.body;
        // To check if the user already exists:
        const existingUser = await User.findOne({email}); //we are checking through emails if the user already exists
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        // Creating the new user :
        const user = new User({email,password});
        await user.save();

        res.status(201).json({message: 'User Created Successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }

});

    // Login route to generate JWT token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = { userId: user._id }; // Payload with user id
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;