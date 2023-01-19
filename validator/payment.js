const { check, body, header, param, query } = require('express-validator');

exports.GenerateOrderValidate = [
  body('amount').exists().withMessage("Amount not present").notEmpty().withMessage("Amount cannot be empty").isInt().withMessage("Enter Valid Amount."),
  body('receipt').exists().withMessage("Receipt not present").notEmpty().withMessage("Receipt cannot be empty").isString().withMessage("Enter Valid Receipt."),
]

exports.SaveTransactionValidate = [
  body('recipt_id').exists().withMessage("Recipt Id not present").notEmpty().withMessage("Recipt Id cannot be empty").isString().withMessage("Enter Valid Recipt Id."),
  body('order_id').optional({ nullable: true }).isString().withMessage("Enter Valid Order Id."),
  body('payment_id').optional({ nullable: true }).isString().withMessage("Enter Valid Payment Id."),
  body('user_id').exists().withMessage("User Id not present").notEmpty().withMessage("User Id cannot be empty").isInt().withMessage("Enter Valid Recipt Id."),
  body('amount').exists().withMessage("amount not present").notEmpty().withMessage("amount cannot be empty").isInt().withMessage("Enter Valid Receipt."),
  body('dateTime').exists().withMessage("dateTime not present").notEmpty().withMessage("dateTime cannot be empty").isString().withMessage("Enter Valid dateTime."),
  body('signature').optional({ nullable: true }).isString().withMessage("Enter Valid signature."),
  body('plan_id').optional({ nullable: true }).trim().isInt().withMessage("plan_id must be Number.")
]