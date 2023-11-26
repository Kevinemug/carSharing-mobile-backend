const jwt = require('jsonwebtoken');
const User = require('../models/userModal'); // Adjust path as necessary
const SECRET_KEY = 'your_secret_key'; // Use environment variables in production

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ userID: decodedToken.userId });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; // Add user to the request object
        next();
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = authenticate;
