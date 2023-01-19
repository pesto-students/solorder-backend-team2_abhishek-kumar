const { check, body, header, param, query } = require('express-validator');
const Model = require('../db/model');

exports.getPinCodeValidate = [
  param('pincode').exists().withMessage("pincode does not exist.").isInt().withMessage("Invalid pincode.").custom((value) => {
    if ((Number(value) >= 100000) && (Number(value) <= 999999))
      return true
    else
      throw new Error('pincode must be 6 digit.');
  })
]


exports.getSearchValidate = [
  query('search').exists().withMessage("search does not exist.").isString().withMessage("search should be string."),
  query('lat').optional({ nullable: true }).custom((value) => {
    if ((Number(value) >= -90) && (Number(value) <= 90))
      return true
    else
      throw new Error('Enter Valid Latitude.');
  }),
  query('lng').optional({ nullable: true }).custom((value) => {
    if ((Number(value) >= -180) && (Number(value) <= 180))
      return true
    else
      throw new Error('Enter Valid Longitude.');
  }),
]