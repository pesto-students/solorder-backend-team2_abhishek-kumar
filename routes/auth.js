var router = require("express").Router();
const { SignUp, SignIn, SignOut } = require("../controller/auth");
const { ValidateTryCatch } = require("../util");
const { SignUpValidate, SignInValidate } = require("../validator/auth");

// User can register given its details
router.post("/signup", SignUpValidate, ValidateTryCatch(SignUp));

// User can loging given its email password
router.post("/signin", SignInValidate, ValidateTryCatch(SignIn));

// User can logout
router.get("/signout", ValidateTryCatch(SignOut));

module.exports = router;