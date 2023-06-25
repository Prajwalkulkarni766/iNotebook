const mongoose = require('mongoose');
// database uri
const mongoURI = 'mongodb://0.0.0.0:27017/iNoteBook';

const ConnectToMongoose = async () => {
    try {
        await mongoose.connect(`${mongoURI}`);
        console.log('connected');
    }
    catch (err) {
        console.log('failed',err);
    }
}

// ConnectToMongoose();

module.exports = ConnectToMongoose;