// Import required modules and controllers
const { 
  retrieveBanksController, 
  updateBanksController,
  deleteBanksController,
  createBanksController, 
  createAccountController 
} = require("./controllers");

const express = require("express");
const mongoose = require("mongoose");

// Create an Express server instance
const server = express();

// Middleware to parse incoming JSON data
server.use(express.json());


// ========================== ROUTES ==========================

// ✅ Retrieve all banks
server.get("/banks", retrieveBanksController);

// ✅ Create a new bank
server.post("/banks", createBanksController);

// ✅ Update a bank (you can modify this to include an ID parameter if needed)
server.put("/banks", updateBanksController);

// ✅ Delete a bank (same — usually you'd include an ID in the route)
server.delete("/banks", deleteBanksController);

// ✅ Create a new account
// (Fixed typo: it was './account' instead of '/account')
server.post("/account", createAccountController);


// ========================== DATABASE CONNECTION ==========================

// Connect to MongoDB Atlas database
mongoose.connect(
  'mongodb+srv://Banks:ZGToQq3HufBKPnYO@cluster0.quschgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Database connection error:", err));


// ========================== SERVER START ==========================

// Start the Express server on port 3000
server.listen(3000, () => console.log("🚀 Server is running on port 3000"));
