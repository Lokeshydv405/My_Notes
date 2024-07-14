const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')
const Secret = "HelloItsme";

// CREATE A USER
router.post(
    "/createuser",
    [
        // Validation rules for email, password, and name
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password should be minimum of 6 characters").isLength({ min: 6 }),
        body("name").isLength({ min: 3 }),
    ],
    async (req, res) => {
        success = false;
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const existingUser = await User.findOne({ email: req.body.email });
                if (existingUser) {
                    // If the user already exists, send an error response
                    res.status(400).send({success, error: "A user with this email already exists" });
                } else {
                    // If the user doesn't exist, create a new user
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    const newUser = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                    });
                    const data = {
                        user: {
                            id: newUser.id
                        }
                    }
                    const authToken = jwt.sign(data, Secret);
                    success= true;
                    res.json({success, authToken });
                }
            } else {
                // If validation errors exist, send them as response
                res.status(400).send({success, errors: result.array() });
            }
        } catch (err) {
            // Send error response in case of failure
            res.status(500).send(success,err);
        }
    }
);
//Route 2 to login the user
// AUTHENTICATE A USER
router.post(
    "/login",
    [
        // Validation rules for email and password
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        try {
            const result = validationResult(req);
            success = false;
            if (!result.isEmpty()) {
                console.error("Validation errors:", result.array());
                return res.status(400).json({success,errors: result.array() });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({success, error: "Incorrect Information" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                console.error("Password does not match for user:", email);
                return res.status(400).json({success, error: "Incorrect Information" });
            }

            const data = {
                user: {
                    id: user.id,
                }
            };
            const authToken = jwt.sign(data, Secret);
            success = true;
            res.json({success, authToken });

        } catch (err) {
            res.status(500).json({success, error: "Some Error Occurred" });
        }
    }
);
// ROUTE 3
// GET USER DETAILS
router.post(
    "/getuser",
    fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id; // Use req.user.id
            const user = await User.findById(userId).select("-password"); // Use user instead of User and select all fields except password
            res.send(user);
        } catch (err) {
            res.status(500).json({ error: "Some Error Occurred" });
        }
    }
);

module.exports = router;
