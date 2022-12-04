const { check, body, header, param } = require('express-validator');
const Model = require('../db/model');

exports.updateProfileValidate = [
  body('name').optional({ nullable: true, checkFalsy: true }).isString().withMessage("name value must be a String.").trim(),
  body('email').optional({ nullable: true, checkFalsy: true }).isEmail().withMessage("Enter Valid Email."),
  body('password').optional({ nullable: true, checkFalsy: true }).isString().withMessage("password must be a String.").isLength({ min: 8 }).withMessage("Minimum password length is 8.").trim(),
  body('newPassword').optional({ nullable: true, checkFalsy: true }).isString().withMessage("New Password must be a String.").isLength({ min: 8 }).withMessage("Minimum new password length is 8.").trim(),
  body('confirmPassword').optional({ nullable: true, checkFalsy: true }).isString().withMessage("Confirm Password must be a String.").isLength({ min: 8 }).withMessage("Minimum confirm password length is 8.").trim(),
]

exports.AddressValidate = [
  body('address').trim().exists().withMessage("address does not exist.").isString().withMessage("address must be string."),
  body('state').trim().exists().withMessage("state does not exist.").isString().withMessage("state must be string."),
  body('city').trim().exists().withMessage("city does not exist.").isString().withMessage("city must be string."),
  body('pincode').exists().isInt().withMessage("Enter Valid pincode.").custom((value) => {
    if ((value > 9999) && (value <= 99999))
      throw new Error('pincode must be 5 digit.');
    else
      return true
  }),
  body('latitude').exists().isDecimal().withMessage("Enter valid latitude."),
  body('longitude').exists().isDecimal().withMessage("Enter valid longitude."),
]

exports.deleteAddressValidate = [
  param('address_id').exists().withMessage("address_id does not exist.").isInt().withMessage("Invalid address_id.")
]