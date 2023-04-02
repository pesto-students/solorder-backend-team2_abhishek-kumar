var router = require("express").Router();
const { Authenticate } = require("../controller/auth");
const { getRestaurantById, UpdateRestaurant, getRestaurantDetails, updateCategoryDetails, deleteCategory, getCategoryById, updateItemDetails, deleteItem, getMenu, restaurantImage, defaultImage, deleteImage, setRating, getRestaurantList, CreateOrder, UpdateOrder, getActiveOrders, getPastOrders } = require("../controller/restaurant");
const { ValidateTryCatch, ParseFormData } = require("../util");
const { AuthValidate } = require("../validator/auth");
const { UpdateRestaurantValidate, getRestaurantDetailsValidate, updateCategoryDetailsValidate, deleteCategoryValidate, updateItemDetailsValidate, deleteItemValidate, restaurantImageValidate, defaultImageValidate, deleteImageValidate, ratingValidate, getRestaurantListValidate, createOrderValidate, updateOrderValidate } = require("../validator/restaurant");


// Get restaurant details if restaurant_id is there in param
router.param("restaurant_id", ValidateTryCatch(getRestaurantById));

// Get restaurant details if restaurant_id is there in param
router.param("category_id", ValidateTryCatch(getCategoryById));

// Update restaurant details
router.post("/updateDetails/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), UpdateRestaurantValidate, ValidateTryCatch(UpdateRestaurant));

// get restaurant details
router.get("/details/:restaurant_id", getRestaurantDetailsValidate, ValidateTryCatch(getRestaurantDetails));

// create and update menu category
router.put("/category/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), updateCategoryDetailsValidate, ValidateTryCatch(updateCategoryDetails));

// delete menu category
router.delete("/category/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), deleteCategoryValidate, ValidateTryCatch(deleteCategory));

// create and update menu item
router.get("/menu/:restaurant_id", ValidateTryCatch(getMenu));

// create and update menu item
router.put("/item/:restaurant_id/:category_id", AuthValidate, ValidateTryCatch(Authenticate), updateItemDetailsValidate, ValidateTryCatch(updateItemDetails));

// delete menu menu item
router.delete("/item/:restaurant_id/:category_id", AuthValidate, ValidateTryCatch(Authenticate), deleteItemValidate, ValidateTryCatch(deleteItem));

// upload restaurant image
router.post("/image/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(ParseFormData), ValidateTryCatch(restaurantImage));

// Update restaurant default image
router.put("/defaultImage/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), defaultImageValidate, ValidateTryCatch(defaultImage));

// Delete restaurant image
router.delete("/deleteImage/:restaurant_id/:imgId", AuthValidate, ValidateTryCatch(Authenticate), deleteImageValidate, ValidateTryCatch(deleteImage));

// Update restaurant rating
router.put("/updateRating/:restaurant_id", AuthValidate, ValidateTryCatch(Authenticate), ratingValidate, ValidateTryCatch(setRating));

// Update restaurant rating
router.post("/restaurantList", getRestaurantListValidate, ValidateTryCatch(getRestaurantList));

// Create Order
router.post("/createorder", AuthValidate, ValidateTryCatch(Authenticate), createOrderValidate, ValidateTryCatch(CreateOrder));

// Update Order
router.put("/updateorder", AuthValidate, ValidateTryCatch(Authenticate), updateOrderValidate, ValidateTryCatch(UpdateOrder));

// get active Orders
router.get("/activeorders", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(getActiveOrders));

// get active Orders
router.get("/pastorders", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(getPastOrders));

module.exports = router;