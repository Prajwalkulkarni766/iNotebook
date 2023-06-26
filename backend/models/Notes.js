const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema means shape of data

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// mongooes model parameter 1st: name of model 2nd: schema
module.exports = mongoose.model('notes', notesSchema)