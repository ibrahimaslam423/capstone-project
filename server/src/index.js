require('dotenv').config(); // Loads environment variables from .env file
const express = require('express'); // Imports Express to build the server
const cors = require('cors'); // Imports CORS to handle frontend-backend requests
const mongoose = require('mongoose'); // Imports Mongoose to connect to MongoDB
const passport = require('passport'); //Imports passport 
const cookieParser = require('cookie-parser'); //Imports cookie-parser 

const authRoutes = require("./routes/auth");


const app = express(); // Creates the Express app
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL })); // Enables CORS
app.use(express.json()); // Allows the app to handle JSON data in requests
app.use(cookieParser());
app.use(passport.initialize());

// Connect to MongoDB using the MONGO_URI from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected", mongoose.connection.name)) // Logs success if connected
  .catch(err => console.error("MongoDB Connection Error" , err)); // Logs error if something goes wrong

  // Register Routes
app.use("/auth", authRoutes); // Handles authentication routes

// Start the server on the specified port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
