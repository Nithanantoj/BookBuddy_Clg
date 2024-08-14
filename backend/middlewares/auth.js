const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'Token is not provided' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        //console.log(req.user.role)
        next();
        
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;