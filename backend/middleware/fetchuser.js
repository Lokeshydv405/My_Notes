const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'HelloItsme');

        // Add the user details to the request object
        req.user = decoded.user;

        // Call the next middleware
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = fetchUser;