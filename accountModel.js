// ===============================
// ACCOUNT MODEL
// ===============================

// Import Mongoose for schema and model creation
const mongoose = require("mongoose");

// Extract Schema constructor from mongoose
const { Schema } = mongoose;



// ===============================
// DEFINE ACCOUNT SCHEMA
// ===============================

// This schema defines the structure of an "Account" document in MongoDB.
// Each account belongs to a specific bank (linked by bankId).
const AccountSchema = new Schema(
  {
    // Account holder’s name
    name: {
      type: String,
      required: true,  // 'required' (not 'require') ensures this field must be provided
    },

    // Account number (must be unique per bank)
    number: {
      type: String,
      required: true,
    },

    // Type of account (e.g., Savings, Current, Fixed Deposit)
    accountType: {
      type: String,
      required: true,
    },

    // Reference to the Bank this account belongs to
    // The `ref` field should match the model name of your bank schema (e.g., "Bank")
    bankId: {
      type: Schema.Types.ObjectId,
      ref: "Bank",   // <-- Make sure your Bank model uses mongoose.model("Bank", BankSchema)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);



// ===============================
// EXPORT MODEL
// ===============================

// This exports the schema as a Mongoose model named 'Account'
// You can now use it in controllers: AccountModel.find(), AccountModel.save(), etc.
module.exports = mongoose.model("Account", AccountSchema);
