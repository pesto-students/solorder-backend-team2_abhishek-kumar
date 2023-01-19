var router = require("express").Router();
const { Authenticate } = require("../controller/auth");
const { getPinCode, getSearch } = require("../controller/location");
const { ValidateTryCatch } = require("../util");
const { AuthValidate } = require("../validator/auth");
const { getPinCodeValidate, getSearchValidate } = require("../validator/location");

// User can get zipcode details.
router.get("/zipcode/:pincode", AuthValidate, ValidateTryCatch(Authenticate), getPinCodeValidate, ValidateTryCatch(getPinCode));

// User can search geolocation.
router.get("/search", AuthValidate, ValidateTryCatch(Authenticate), getSearchValidate, ValidateTryCatch(getSearch));

module.exports = router;