const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("../config/passport");

const router = express.Router();

// Start Google Authentication for UTC Login
router.get("/google/utc", (req, res, next) => {
    res.cookie("loginType", "UTC", { httpOnly: true, secure: true, sameSite: "Strict" });
    next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

// Start Google Authentication for Property Login
router.get("/google/property", (req, res, next) => {
    res.cookie("loginType", "Property", { httpOnly: true, secure: true, sameSite: "Strict" });
    next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get("/google/callback", passport.authenticate("google", { session: false }), async (req, res) => {
    try {
        const { sub, email, name } = req.user;
        let loginType = req.cookies.loginType; // Retrieve login type from cookie
        res.clearCookie("loginType"); // Clear cookie after use

        let role = "Unassigned"; // Default role

        
        if (email.endsWith("@mocs.utc.edu")) {
            role = "Student"; // Only assign Student if UTC login was used & email is @mocs.utc.edu
            }
    
        if (!email.endsWith("@mocs.utc.edu") && !email.endsWith("@utc.edu")) {
            role = "Property"; // Only assign Property role if Property login was used
            }
        

        // Check if user exists in MongoDB
        let user = await User.findById(sub);
        if (!user) {
            // Assign role based on email domain and login type
            if (loginType === "UTC Login" && email.endsWith("@mocs.utc.edu")) {
                role = "Student";
            } else if (loginType === "Property Login" && !email.endsWith("@mocs.utc.edu") && !email.endsWith("@utc.edu")) {
                role = "Property";
            }

            user = new User({ _id: sub, email, name, role, createdAt: new Date() });
        } else {
            user.lastLogin = new Date();

            // Ensure the correct role is assigned on every login
            if (loginType === "UTC Login" && email.endsWith("@mocs.utc.edu")) {
                user.role = "Student";
            } else if (loginType === "Property Login" && !email.endsWith("@mocs.utc.edu") && !email.endsWith("@utc.edu")) {
                user.role = "Property";
            }
        }

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email, role }, process.env.JWT_SECRET, { expiresIn: "24h" });

        // Set authentication cookie
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
        res.redirect(`${process.env.FRONTEND_URL}/dashboard`); // Fixed syntax error here
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(500).json({ message: "Authentication failed" });
    }
});

module.exports = router;
