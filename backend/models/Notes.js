import mongoose from 'mongoose';
const { Schema } = mongoose;

// schema means shape of data

const notesSchema = new Schema({
    notes_title: {
        type: String,
        required: true
    },
    notes_description: {
        type: String,
        required: true
    },
    notes_tags: {
        type: String
    },
    notes_created_date: {
        type: Date,
        default: Date.now
    },
});

// mongooes model parameter 1st: name of model 2nd: schema
module.exports = mongoose.model('notes', notesSchema)