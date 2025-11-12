const express = require("express");
const createAccountController = require("../controllers/accountController").createAccountController;
const router = express.Router();


// ✅ Create a new account
// (Fixed typo: it was './account' instead of '/account')
router.post("/account", createAccountController);

module.exports = router;