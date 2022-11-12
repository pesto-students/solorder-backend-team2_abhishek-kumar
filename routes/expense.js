const router = require("express").Router();
const { AddExpense,getFile } = require("../controller/expense");
const { ParseFormData } = require("../util");

// User can register given its details
router.post("/addexpense", ParseFormData, AddExpense);
router.get("/file", getFile);

// User can loging given its email password
// router.post("/signin", SignInValidate, SignIn);

// User can logout
// router.get("/signout", SignOut);

module.exports = router;