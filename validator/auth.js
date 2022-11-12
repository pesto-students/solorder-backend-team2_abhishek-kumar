const { check, body } = require('express-validator');
const {pool,client} = require('../db');

exports.SignUpValidate = [
  body('name').exists().withMessage("name not present").notEmpty().withMessage("name cannot be empty").isString().withMessage("pagination value must be a String."),
  body('email').exists().withMessage("email not present").notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Enter Valid Email."),
  body('password').exists().withMessage("password not present").notEmpty().withMessage("password cannot be empty").custom((value) => {
    if (String(value).length < 8)
      throw new Error('Minimum password length is 8.');
    else
      return true
  }),
  body('description').optional().isString().withMessage("description value must be string."),
]

exports.SignInValidate = [
  body('email').exists().withMessage("email not present").notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Enter Valid Email."),
  body('password').exists().withMessage("password not present").notEmpty().withMessage("password cannot be empty").custom((value) => {
    if (String(value).length < 8)
      throw new Error('Minimum password length is 8.');
    else
      return true
  })
]