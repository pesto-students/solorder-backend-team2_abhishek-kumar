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
    if ((value > 99999) && (value <= 999999))
      return true
    else
      throw new Error('pincode must be 6 digit.');
  }),
  body('latitude').exists().custom((value) => {
    if ((Number(value) >= -90) && (Number(value) <= 90))
      return true
    else
      throw new Error('Enter Valid Latitude.');
  }),
  body('longitude').exists().custom((value) => {
    if ((Number(value) >= -180) && (Number(value) <= 180))
      return true
    else
      throw new Error('Enter Valid Longitude.');
  }),
]

exports.deleteAddressValidate = [
  param('address_id').exists().withMessage("address_id does not exist.").isInt().withMessage("Invalid address_id.")
]

exports.AddDeliveryPersonValidate = [
  body('name').trim().exists().withMessage("address does not exist.").isString().withMessage("name must be string."),
  body('phoneNo').trim().exists().withMessage("phoneNo does not exist.").isInt().withMessage("state must be string.").custom((value) => {
    if ((Number(value) >= 1000000000) && (Number(value) <= 9999999999))
      return true
    else
      throw new Error('Enter Valid phoneNo.');
  }),
  body('vehicalName').trim().exists().withMessage("vehicalName does not exist.").isString().withMessage("vehicalName must be string."),
  body('vehicalNumber').trim().exists().withMessage("vehicalNumber does not exist.").isString().withMessage("vehicalNumber must be string.")
]

exports.DeleteDeliveryPersonValidate = [
  param('person_id').trim().exists().withMessage("person_id does not exist.").isInt().withMessage("person_id must be string.")
]