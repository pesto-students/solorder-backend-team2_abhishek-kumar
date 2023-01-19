var router = require("express").Router();
const { Authenticate } = require("../controller/auth");
const { GenerateOrder, SaveTransaction } = require("../controller/payment");
const { ValidateTryCatch } = require("../util");
const { AuthValidate } = require("../validator/auth");
const { GenerateOrderValidate, SaveTransactionValidate } = require("../validator/payment");

// Get orderId
router.post("/order", AuthValidate, ValidateTryCatch(Authenticate), GenerateOrderValidate, ValidateTryCatch(GenerateOrder));

// Get save transaction
router.post("/saveTransaction", AuthValidate, ValidateTryCatch(Authenticate), SaveTransactionValidate, ValidateTryCatch(SaveTransaction));

module.exports = router;