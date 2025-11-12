const {
  retrieveBanksController,
  createBanksController,
  updateBanksController,
  deleteBanksController,
} = require("../controllers/bankController");

const express = require("express");

const router = express.Router();


// ✅ Retrieve all banks
router.get("/banks", retrieveBanksController);

// ✅ Create a new bank
router.post("/banks", createBanksController);

// ✅ Update a bank (you can modify this to include an ID parameter if needed)
router.put("/banks", updateBanksController);

// ✅ Delete a bank (same — usually you'd include an ID in the route)
router.delete("/banks", deleteBanksController);

module.exports = router;