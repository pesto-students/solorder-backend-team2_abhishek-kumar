var router = require("express").Router();
const { Authenticate } = require("../controller/auth");
const { ProfileDetails, updateProfile, addAddress, getAddress, getAddressById, updateAddress, deleteAddress, AddDeliveryPerson, getDeliveryPersonList, DeleteDeliveryPerson } = require("../controller/dashboard");
const { ValidateTryCatch } = require("../util");
const { AuthValidate } = require("../validator/auth");
const { updateProfileValidate, AddressValidate, deleteAddressValidate, AddDeliveryPersonValidate, DeleteDeliveryPersonValidate } = require("../validator/dashboard");

// Get address details if address_id is there in params
router.param("address_id", ValidateTryCatch(getAddressById));

// Get Profile details
router.get("/profile", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(ProfileDetails));

// Update Profile details
router.put("/updateProfile", AuthValidate, ValidateTryCatch(Authenticate), updateProfileValidate, ValidateTryCatch(updateProfile));

// Get User addresses
router.get("/addresses", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(getAddress));

// Add User addresses
router.post("/addAddress", AuthValidate, ValidateTryCatch(Authenticate), AddressValidate, ValidateTryCatch(addAddress));

// update user address
router.put("/updateAddress/:address_id", AuthValidate, ValidateTryCatch(Authenticate), AddressValidate, ValidateTryCatch(updateAddress));

// Delete address
router.delete("/deleteAddress/:address_id", AuthValidate, ValidateTryCatch(Authenticate), deleteAddressValidate, ValidateTryCatch(deleteAddress));

// Add Delivery Persons
router.post("/deliveryperson", AuthValidate, ValidateTryCatch(Authenticate), AddDeliveryPersonValidate, ValidateTryCatch(AddDeliveryPerson));

// get Delivery Persons list
router.get("/deliveryperson", AuthValidate, ValidateTryCatch(Authenticate), ValidateTryCatch(getDeliveryPersonList));

// Delete Delivery Persons
router.delete("/deliveryperson/:person_id", AuthValidate, ValidateTryCatch(Authenticate), DeleteDeliveryPersonValidate, ValidateTryCatch(DeleteDeliveryPerson));

module.exports = router;