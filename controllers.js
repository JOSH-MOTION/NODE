// Importing the Mongoose models for banks and accounts
const BankModel = require("./model");
const AccountModel = require("./accountModel");



// ===============================
// BANK CONTROLLERS
// ===============================

// Retrieve all banks or a single bank (optional filter)
const retrieveBanksController = async (req, res) => {
  try {
    // Optional: you can allow finding by name or ID using query params
    const { id, name } = req.query;

    let bank;

    if (id) {
      // If ID is provided, find bank by ID
      bank = await BankModel.findById(id);
    } else if (name) {
      // If name is provided, find bank by name
      bank = await BankModel.findOne({ name });
    } else {
      // Otherwise, find all banks
      bank = await BankModel.find();
    }

    res.json({ data: bank });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving bank(s)" });
  }
};



// Create a new bank record
const createBanksController = async (req, res) => {
  try {
    const { name, location, branch, phone, address, accountNumber } = req.body;

    // Validate that required fields exist
    if (!name || !location || !branch) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bank = new BankModel({
      name,
      location,
      branch,
      phone,
      address,
      accountNumber,
    });

    const result = await bank.save();

    res.json({ message: "Bank created successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating bank" });
  }
};



// Update existing bank by ID
const updateBanksController = async (req, res) => {
  try {
    const { id, name, location, branch, address, accountNumber } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Bank ID is required" });
    }

    const bank = await BankModel.findById(id);

    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    // Update the bank fields
    bank.name = name || bank.name;
    bank.location = location || bank.location;
    bank.branch = branch || bank.branch;
    bank.address = address || bank.address;
    bank.accountNumber = accountNumber || bank.accountNumber;

    const updatedBank = await bank.save();

    res.json({ message: "Updated successfully", data: updatedBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating bank" });
  }
};



// Delete bank by ID
const deleteBanksController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Bank ID is required" });
    }

    const deletedBank = await BankModel.findByIdAndDelete(id);

    if (!deletedBank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    res.json({ message: "Bank deleted successfully", data: deletedBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting bank" });
  }
};



// ===============================
// ACCOUNT CONTROLLER
// ===============================

// Create a new account linked to a specific bank
const createAccountController = async (req, res) => {
  try {
    const { name, number, accountType, bankId } = req.body;

    // Validate required fields
    if (!name || !number || !bankId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: check if the bank exists before creating account
    const bankExists = await BankModel.findById(bankId);
    if (!bankExists) {
      return res.status(404).json({ message: "Bank not found" });
    }

    const account = new AccountModel({ name, number, accountType, bankId });

    const result = await account.save();

    res.json({ message: "Account created successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating account" });
  }
};



// Exporting all controller functions so they can be used in route files
module.exports = {
  retrieveBanksController,
  createBanksController,
  updateBanksController,
  deleteBanksController,
  createAccountController,
};
