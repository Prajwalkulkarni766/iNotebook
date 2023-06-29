// importing express js from express
const express = require('express');

// using jwt jsonwebtoken to transfer the infromationg from server to client this package will verify the user getting data related to him / her only
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisjwtsecretkey';

// importing user schema
var Notes = require('../models/Notes');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// importing fetchUser middleware
const fetchUser = require('../middleware/fetchUser');

// login required end-point: /api/notes/fetchallnotes , this will fetch the notes
// route 1
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        // getting notes related to that user
        let notes = await Notes.find({ user: req.user.id });
        // sending received notes to the user
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// login required end-point: /api/notes/savenotes , this will save the notes
// route 2
router.post('/savenotes', fetchUser,
    body("title", "Enter a valid title. Title require minimum 3 characters").isLength({ min: 1 }),
    body("description", "Enter a valid description. Description must contain atleast 8 characters.").isLength({ min: 1 })
    , async (req, res) => {
        let req_status = false;
        // if there are errors then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ req_status, errors: errors.array() });
        }
        try {
            // saving new note according to the model defined in the Notes.js
            newNotes = await Notes.create({
                title: req.body.title,
                description: req.body.description,
                user: req.user.id,
            });
            // sending saved notes in the response
            res.json(newNotes);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });

// login required end-point: /api/notes/updatenotes/:id , this will update the notes
// route 3
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        // destructuring the title and description from the request
        const { title, description } = req.body;
        // creating a blank newnote for updating
        let newNotes = {};
        // checking user changed title or not means title is present in the request body or not if yes then create its object
        if (title) {
            newNotes.title = title;
        }
        // checking user changed description or not means description is present in the request body or not if yes then create its object
        if (description) {
            newNotes.description = description;
        }

        // checking notes exists or not
        let note = await Notes.findById(req.params.id);
        // if note dosen't exists then send following response
        if (!note) {
            return res.send(404).json({ errors: "Not found" });
        }
        // checking that fetched user is editing that note or any one else 
        if (note.user.toString() !== req.user.id) {
            return res.send(401).json({ errors: "Unauthorized" });
        }
        // updating note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        // sending updated note in response 
        res.json(newNotes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// login required end-point: /api/notes/deletenotes/:id , this will delete the notes
// route 4
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        // destructuring the title and description from the request
        const { title, description } = req.body;
        // checking notes exists or not
        let note = await Notes.findById(req.params.id);
        // if note dosen't exists then send following response
        if (!note) {
            return res.send(404).json({ errors: "Not found" });
        }
        // checking that fetched user is editing that note or any one else 
        if (note.user.toString() !== req.user.id) {
            return res.send(401).json({ errors: "Unauthorized" });
        }
        // delete note
        note = await Notes.findByIdAndDelete(req.params.id);
        // sending delete note in response 
        res.json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;