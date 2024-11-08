const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

// Now we will use bcrypt to hash the password :

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;