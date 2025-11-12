// ========================== BANK MODEL ==========================

// Import mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// Extract Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define the schema for the Bank collection
const BankSchema = new mongoose.Schema({
    
    // Bank name (e.g., "Absa Bank")
    name: {
        type: String,
        required: true
    },

    // Bank location (e.g., "Accra")
    location: {
        type: String,
        required: true
    },

    // Bank branch name (e.g., "East Legon Branch")
    branch: {
        type: String,
        required: true
    },

    // Full address of the branch
    address: {
        type: String,
        required: true
    },

    // Main account number for the bank branch
    accountNumber: {
        type: String,
        required: true
    },

    // Array of related account documents (referencing the Account model)
    accounts: [
        {
            type: Schema.Types.ObjectId, // Each account is referenced by its ObjectId
            ref: "Account",              // Refers to the "Account" model
            required: true
        }
    ]
});

// Create the model for the 'Banks' collection
const BankModel = mongoose.model("Banks", BankSchema);

// Export the model for use in controllers and routes
module.exports = BankModel;
