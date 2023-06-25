const ConnectToMongoose = require('./db');
const express = require('express');
const app = express();

// connecting to the database
ConnectToMongoose();

// if you want to use request body then you must have to use following middleware
app.use(express.json());

// available routes
// route for authentication
app.use('/api/authentication', require('./routes/authentication'));
// route for notes
app.use('/api/notes', require('./routes/notes'));

app.get('', (req, res) => {
    res.send('Home');
})

app.listen(4500);