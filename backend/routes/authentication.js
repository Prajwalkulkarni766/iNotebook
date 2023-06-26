// importing express js from express
const express = require('express');

// using bcrypt to store password in secure way
const bcrypt = require('bcryptjs');

// using jwt jsonwebtoken to transfer the infromationg from server to client this package will verify the user getting data related to him / her only
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisjwtsecretkey';

// importing user schema
var user = require('../models/User');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// importing fetchUser middleware
const fetchUser = require('../middleware/fetchUser');

// no login required end-point: /api/authentication/createuser , this will create a new user
// route 1
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
                // generating random salt by using bycrypt.getSaltSync
                let salt = await bcrypt.genSaltSync(10);
                // generating hash of password and adding salt with it
                let hashPassword = await bcrypt.hashSync(req.body.password, salt);
                newUser = await user.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword,
                });
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authenticationToken = jwt.sign(data, JWT_SECRET);
                return res.json({ authenticationToken });
                // return res.status(200).json(newUser);
            }
            // if user with entered email exists then it will send an error message
            else {
                return res.status(400).json({ error: 'User with this email address already exists' });
            }
        }
        // if any other error occuredd with data base 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });

// no login required end-point: /api/authentication/loginuser , this will help user to login
// route 2
router.post('/loginuser',
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "Enter a valid password. Password must contain atleast 8 characters.").notEmpty().isLength({ min: 8 })
    , async (req, res) => {
        // if there are errors then return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            let User = await user.findOne({ email });
            if (!User) {
                return res.status(400).json({ errors: "Login with correct credentials" });
            }
            let passwordcheck = await bcrypt.compare(password, User.password);
            if (!passwordcheck) {
                return res.status(400).json({ errors: "Login with correct credentials" });
            }
            const data = {
                user: {
                    id: User.id
                }
            }
            // console.log(data);
            const authenticationToken = jwt.sign(data, JWT_SECRET);
            return res.json({ authenticationToken });

        }
        // if any other error occuredd with data base 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    });

// login required end-point: /api/authentication/getuser , this will fetch the user data
// route 3
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        let User = await user.findById(userId).select('-password');
        res.send(User);
    }
    // if any other error occuredd with data base 
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;