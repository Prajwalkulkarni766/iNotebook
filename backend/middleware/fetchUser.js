const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisjwtsecretkey';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    // if token is not valid then send response 401
    if (!token) {
        return res.send(401).json({ error: 'Please authenticate using a vaild token' });
    }
    try {
        // verify the token
        const data = jwt.verify(token, JWT_SECRET);
        // append all data to the request
        req.user = data.user;
        // next means moving to the next function
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send('Please authenticate using a vaild token');
    }
}

module.exports = fetchUser;