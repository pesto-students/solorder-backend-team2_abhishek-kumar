var router = require("express").Router();
const { SignUp, SignIn, SignOut } = require("../controller/auth");
const { SignUpValidate, SignInValidate } = require("../validator/auth");


// User can register given its details
router.post("/signup", SignUpValidate, SignUp);

// User can loging given its email password
router.post("/signin", SignInValidate, SignIn);

// User can logout
router.get("/signout", SignOut);

module.exports = router;