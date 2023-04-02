var router = require("express").Router();
const { SignUp, SignIn, SignOut, SendOtp, ValidateOtp, UpdatePasswordViaOtp } = require("../controller/auth");
const { ValidateTryCatch } = require("../util");
const { SignUpValidate, SignInValidate, SendOtpValidate, ValidateOtpValidate, UpdatePasswordViaOtpValidate } = require("../validator/auth");

// User can register given its details
router.post("/signup", SignUpValidate, ValidateTryCatch(SignUp));

// User can loging given its email password
router.post("/signin", SignInValidate, ValidateTryCatch(SignIn));

// User can logout
router.get("/signout", ValidateTryCatch(SignOut));

// Email send OTP
router.post("/sendotp", SendOtpValidate, ValidateTryCatch(SendOtp));

// validate OTP
router.post("/validateotp", ValidateOtpValidate, ValidateTryCatch(ValidateOtp));

// Update password via OTP verification.
router.post("/updatePasswordViaOtp", UpdatePasswordViaOtpValidate, ValidateTryCatch(UpdatePasswordViaOtp));

module.exports = router;