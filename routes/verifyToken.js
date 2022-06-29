const jwt = require('jsonwebtoken');

//MiddleWare function for private data 
module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Assess denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}