const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => { // middleware to verify JWT token
    
    const authHeader = req.headers['authorization'];

    if(!authHeader) return res.status(401).send("Not Authorized");
    console.log(authHeader); //Bearer Token
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send("Invalid Token");
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT;