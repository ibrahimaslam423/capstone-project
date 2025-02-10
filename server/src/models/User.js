const mongoose = require("mongoose");

//note add saved properties list later to call for what they saved for later 
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Google 'sub' ID
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["Unassigned", "Student", "Property", "Admin", "Manager", "Staff"], required: true, default: "Unassigned" },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

module.exports = mongoose.model("User", userSchema);
