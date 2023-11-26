const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModal'); // adjust path as necessary
const SECRET_KEY = 'your_secret_key'; // Use environment variables in production

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send('Username is already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ userId: savedUser.userID }, SECRET_KEY);

        res.status(201).json({
            message: 'Account created successfully',
            user: { id: savedUser.userID, username: savedUser.username },
            token: token
        });

    } catch (error) {
        res.status(500).send('Error creating the user');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.userID }, SECRET_KEY);

            res.json({
                message: 'Login successful',
                user: { id: user.userID, username: user.username },
                token: token
            });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in the user');
    }
};
