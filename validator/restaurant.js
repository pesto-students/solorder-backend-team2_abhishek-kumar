const { check, body, header, param, query } = require('express-validator');
const Model = require('../db/model');

exports.UpdateRestaurantValidate = [
  body('name').optional({ nullable: true }).trim().isString().withMessage("Name must be String."),
  body('state').optional({ nullable: true }).trim().isString().withMessage("State must be String."),
  body('city').optional({ nullable: true }).trim().isString().withMessage("City must be String."),
  body('pincode').optional({ nullable: true }).isInt().withMessage("Enter Valid pincode.").custom((value) => {
    if ((value > 9999) && (value <= 99999))
      throw new Error('pincode must be 5 digit.');
    else
      return true
  }),
  body('latitude').optional({ nullable: true }).custom((value) => {
    if ((Number(value) >= -90) && (Number(value) <= 90))
      return true
    else
      throw new Error('Enter Valid Latitude.');
  }),
  body('longitude').optional({ nullable: true }).custom((value) => {
    if ((Number(value) >= -180) && (Number(value) <= 180))
      return true
    else
      throw new Error('Enter Valid Longitude.');
  }),
  body('deliveryRange').optional({ nullable: true }).isInt().withMessage("Enter valid deliveryRange."),
  body('deliveryTime').optional({ nullable: true }).isInt().withMessage("Enter valid deliveryTime."),
  body('costForTwo').optional({ nullable: true }).isInt().withMessage("Enter valid costForTwo."),
  body('galaryImgs').optional({ nullable: true }).isJSON().withMessage("Enter valid Image data."),
  body('purchaseDate').optional({ nullable: true }).trim().isString().withMessage("purchaseDate must be String."),
  body('daysToExpire').optional({ nullable: true }).isInt().withMessage("Enter valid daysToExpire."),
  body('stepCompleted').optional({ nullable: true }).isInt().withMessage("Enter valid stepCompleted.").custom((value) => {
    if ((value >= 0) && (value <= 4))
      return true
    else
      throw new Error('stepCompleted Minimum value must be 4.');
  }),
  body('cuisines').optional({ nullable: true }).isArray().withMessage("Enter valid cuisines."),
  body('isActive').optional({ nullable: true }).isBoolean().withMessage("Enter valid isActive value."),
  body('rating').optional({ nullable: true }).isArray().withMessage("Enter valid isActive value."),
  body('plan_id').optional({ nullable: true }).isInt().withMessage("Enter valid plan_id value."),
  body('address').optional({ nullable: true }).trim().isString().withMessage("Address must be String."),
  body('recipt_id').optional({ nullable: true }).trim().isString().withMessage("recipt_id must be String."),
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id.")
]

exports.getRestaurantDetailsValidate = [
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id.")
]

exports.updateCategoryDetailsValidate = [
  body('name').exists().withMessage("Category Name must exist.").trim().isString().withMessage("Category Name must be String."),
  query('category_id').custom((value, { req }) => {
    if (Number.isInteger(Number(value))) {
      return true;
    } else if (Number.isInteger(Number(req?.query?.isNew)) == 1) {
      return true;
    } else {
      return false;
    }
  }).withMessage("category_id not present."),
  query('isNew').custom((value, { req }) => {
    if (Number.isInteger(Number(value)) == 1) {
      return true;
    } else if (req?.query?.category_id && Number.isInteger(Number(req?.query?.category_id))) {
      return true;
    } else {
      return false;
    }
  }).withMessage("isNew not present."),
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id.")
]

exports.deleteCategoryValidate = [
  query('category_id').exists().withMessage("category_id does not exist.").isInt().withMessage("category_id should be number."),
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id.")
]

exports.updateItemDetailsValidate = [
  body('name').exists().withMessage("Category Name must exist.").trim().isString().withMessage("Category Name must be String."),
  body('description').optional({nullable:true,checkFalsy:true}).trim().isString().withMessage("description must be String."),
  body('price').exists().isInt().withMessage("price must be Number."),
  body('isVeg').exists().isBoolean().withMessage("isVeg must be true or false."),
  query('item_id').custom((value, { req }) => {
    if (Number.isInteger(Number(value))) {
      return true;
    } else if (Number.isInteger(Number(req?.query?.isNew)) == 1) {
      return true;
    } else {
      return false;
    }
  }).withMessage("item_id not present."),
  query('isNew').custom((value, { req }) => {
    if (Number.isInteger(Number(value)) == 1) {
      return true;
    } else if (req?.query?.item_id && Number.isInteger(Number(req?.query?.item_id))) {
      return true;
    } else {
      return false;
    }
  }).withMessage("isNew not present."),
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id."),
  param('category_id').exists().withMessage("category_id does not exist.").isInt().withMessage("Invalid category_id.")
]

exports.deleteItemValidate = [
  query('item_id').exists().withMessage("item_id does not exist.").isInt().withMessage("item_id should be number."),
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id."),
  param('category_id').exists().withMessage("category_id does not exist.").isInt().withMessage("Invalid category_id.")
]

exports.restaurantImageValidate = [
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id.")
]

exports.defaultImageValidate = [
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id."),
  body('imgId').exists().withMessage("imgId does not exist.").isString().withMessage("Invalid imgId.")
]

exports.deleteImageValidate = [
  param('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("Invalid restaurant_id."),
  param('imgId').exists().withMessage("imgId does not exist.").isString().withMessage("Invalid imgId.")
]

exports.ratingValidate = [
  body('ratingValue').exists().withMessage("Rating does not exist.").isDecimal().withMessage("Rating must be Number.")
]

exports.getRestaurantListValidate = [
  body('pincode').exists().withMessage("Pincode does not exist.").isInt().withMessage("Enter Valid pincode.").custom((value) => {
    if ((value > 9999) && (value <= 99999))
      throw new Error('pincode must be 5 digit.');
    else
      return true
  }),
  body('filterType').exists().withMessage("filterType does not exist.").isInt().withMessage("filterType data type Invalid."),
  body('searchKey').optional({ nullable: true }).trim().isString().withMessage("search should be string."),
]

exports.createOrderValidate = [
  body('restaurant_id').exists().withMessage("restaurant_id does not exist.").isInt().withMessage("restaurant_id data type Invalid."),
  body('totalCost').exists().withMessage("totalCost does not exist.").isInt().withMessage("totalCost data type Invalid."),
  body('items').exists().withMessage("items does not exist.").isArray().withMessage("items data type Invalid."),
  body('recipt_id').exists().withMessage("recipt_id does not exist.").trim().isString().withMessage("recipt_id data type Invalid."),
  body('orderTime').exists().withMessage("orderTime does not exist.").trim().isString().withMessage("orderTime data type Invalid."),
  body('orderAddress').exists().withMessage("orderAddress does not exist.").isObject().withMessage("orderAddress data type Invalid."),
]

exports.updateOrderValidate = [
  body('order_id').exists().withMessage("order_id does not exist.").isInt().withMessage("order_id data type Invalid."),
  body('estimateDeliveryTime').optional({ nullable: true }).isInt().withMessage("estimateDeliveryTime data type Invalid."),
  body('deliveryTime').optional({ nullable: true }).isString().withMessage("deliveryTime data type Invalid."),
  body('orderStatus_Id').exists().withMessage("orderStatus_Id does not exist.").isInt().withMessage("orderStatus_Id data type Invalid."),
  body('deliveryPerson').optional({ nullable: true }).isObject().withMessage("deliveryPerson data type Invalid."),
]