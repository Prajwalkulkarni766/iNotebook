// importing express js from express
const express = require('express');

// importing user schema
var user = require('../models/User');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// no login required end-point: /api/authentication/createuser , this will create a new user
router.post('/createuser',
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password. Password must contain atleast 8 characters.").isLength({ min: 8 }),
    body("name", "Enter a valid name").isLength({ min: 1 })
    , async (req, res) => {
        // if there are errors then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // checking the user with this email exists or not
            let newUser = await user.findOne({ email: req.body.email });
            // if user with entered email not exists then record will be inserted
            if (!newUser) {
                newUser = await user.create(req.body);
                return res.status(200).json(newUser);
            }
            // if user with entered email exists then it will send an error message
            else {
                return res.status(400).json({ error: 'User with this email address already exists' });
            }
        }
        // if any other error occuredd with data base 
        catch (err) {
            console.log(err.message);
            res.status(500).send('some error occurred');
        }
    });

module.exports = router;