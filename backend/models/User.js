const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema means shape of data 
// user schema representing the shape of data of user means how we are going to store the data of user in the database / collection

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactnumber: {
        type: Number
    },
    gender: {
        type: String
    },
    signup_date: {
        type: Date,
        default: Date.now
    },
});

// mongooes model parameter 1st: name of model 2nd: schema
const User = mongoose.model('user', userSchema);
module.exports = User;