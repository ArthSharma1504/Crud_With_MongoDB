// config/passport.js
require('dotenv').config();

const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../models/User'); // Assuming you have a User model

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // Extracts JWT from "Authorization" header
    secretOrKey: process.env.JWT_SECRET, // Secret key to verify the JWT token
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.userId); // Check if user exists
            if (!user) {
                return done(null, false); // If user not found, return false
            }
            return done(null, user); // If user is found, return user
        } catch (error) {
            return done(error, false); // If error, return error
        }
    })
);

module.exports = passport;


// i need the UnderfuckingStand this code so rn i'm just pasting  