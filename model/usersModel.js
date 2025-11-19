// ===============================
// USER MODEL
// ===============================

const mongoose = require("mongoose");
const { Schema } = mongoose;

// ===============================
// DEFINE USER SCHEMA
// ===============================

const UserSchema = new Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User email (should be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Password (will be hashed before saving)
    password: {
      type: String,
      required: true,
    },

    // Optional: linked accounts (if needed)
    accounts: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Account", // Refers to the Account model
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// ===============================
// EXPORT MODEL
// ===============================
module.exports = mongoose.model("User", UserSchema);
