const { check, body, header } = require('express-validator');
const Model = require('../db/model');

exports.SignUpValidate = [
  body('name').exists().withMessage("name not present").notEmpty().withMessage("name cannot be empty").isString().withMessage("pagination value must be a String.").trim(),
  body('email').exists().withMessage("email not present").notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Enter Valid Email.").custom(async (value) => {
    if (value) {
      let emailResult = await Model.User.findOne({ where: { email: value } });
      if (emailResult) {
        throw new Error("Email already used.");
      } else return true
    }
  }),
  body('password').exists().withMessage("password not present").notEmpty().withMessage("password cannot be empty").isLength({ min: 8 }).withMessage("Minimum password length is 8."),
  body('role_id').exists().withMessage("Please specify role.").isInt().withMessage("Role_id is Interger."),
]

exports.SignInValidate = [
  body('email').exists().withMessage("email not present").notEmpty().withMessage("email cannot be empty").isEmail().withMessage("Enter Valid Email."),
  body('password').exists().withMessage("password not present").notEmpty().withMessage("password cannot be empty").isLength({ min: 8 }).withMessage("Minimum password length is 8."),
]

exports.AuthValidate = [
  header('token').exists().withMessage("token must exists.").isJWT().withMessage("Invalid user token.")
]