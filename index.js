const express = require("express");
const mongoose = require("mongoose");

// Load environment variables from a .env file into process.env
require('dotenv').config()

// Port configuration
const PORT = process.env.PORT || 5000

// Create an Express server instance
const server = express();

// ========================== IMPORT ROUTES ==========================
const BankRoutes = require("./routes/bankRoutes");
const AccountRoutes = require("./routes/accountRoute");

// Middleware to parse incoming JSON data
server.use(express.json());


// ========================== ROUTES ==========================
server.use( BankRoutes);
server.use( AccountRoutes);

// ========================== DATABASE CONNECTION ==========================

// Connect to MongoDB Atlas database
mongoose.connect(
  process.env.MONGODB_URL)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Database connection error:", err));


// ========================== SERVER START ==========================

// Start the Express server on port 3000
server.listen(PORT, () => console.log("🚀 Server is running on port 3000"));
