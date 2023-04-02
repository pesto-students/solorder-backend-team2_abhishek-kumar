const Model = require('../db/model');
const bcrypt = require('bcrypt');

exports.ProfileDetails = async (req, res, next) => {
  let { user } = req
  let userData = await Model.User.findOne({ where: { user_id: user?.user_id } });
  let { defaultAddressId, email, name, restaurant_id, role_id, user_id } = userData
  if (user) {
    res.json({
      error: false,
      msg: "User data fetched successfully.",
      data: { defaultAddressId, email, name, restaurant_id, role_id, user_id }
    })
  } else {
    throw { error: true, msg: "User not found.", status: 400 }
  }
};

exports.updateProfile = async (req, res, next) => {
  let { user, body } = req
  body = body ? body : {}
  user = user ? user : {}
  let { email: userEmail, user_id } = user
  let { name, email, password, newPassword, confirmPassword } = body

  let encryptPsw = null

  if (password) {
    if (newPassword && confirmPassword && (newPassword !== confirmPassword)) {
      throw { error: true, msg: "New Password & Confirm Password Does not match.", status: 400 }
    } else if (!newPassword) {
      throw { error: true, msg: "New Password is not present.", status: 400 }
    } else if (!confirmPassword) {
      throw { error: true, msg: "Confirm Password is not present.", status: 400 }
    }
    let userData = await Model.User.findOne({ where: { email: userEmail } });
    if (!userData) {
      throw { error: true, msg: "User Not found.", status: 400 }
    }
    userData = userData && userData.dataValues ? userData.dataValues : {}
    let { encrypt_psw } = userData
    encryptPsw = encrypt_psw
    if (!bcrypt.compareSync(password, encrypt_psw)) {
      throw { error: true, msg: "Wrong Password.", status: 400 }
    } else {
      encryptPsw = bcrypt.hashSync(newPassword, parseInt(process.env.BCRYPT_SALT));
    }
  }

  if (email && (userEmail !== email)) {
    let isUser = await Model.User.findOne({ where: { email } });
    if (isUser)
      throw { error: true, msg: "Email already used.", status: 400 }
  }

  let userData = {}

  if (name) userData['name'] = name;
  if (email) userData['email'] = email;
  if (encryptPsw) userData['encrypt_psw'] = encryptPsw;

  userData = await Model.User.update({ ...userData }, {
    where: {
      user_id
    }
  });
  
  if (userData) {
    res.json({
      error: false,
      msg: "User data updated successfully.",
    })
  } else {
    throw { error: true, msg: "Could not update user.", status: 400 }
  }
};

exports.addAddress = async (req, res, next) => {
  let { user, body } = req
  body = body ? body : {}
  user = user ? user : {}
  let { user_id } = user
  let { address, state, city, pincode, latitude, longitude } = body
  let addressList = await Model.Address.findAll({
    where: { user_id },
    attributes: ['address_id']
  })
  let addressData = await Model.Address.create({ user_id, address, state, city, pincode, latitude, longitude })
  let { address_id } = addressData

  if (!(addressList && addressList.length)) {
    await Model.User.update({ defaultAddressId: address_id }, {
      where: {
        user_id
      }
    })
  }
  res.json({
    error: false,
    msg: "Address Created Successfully.",
    data: addressData
  })
};

exports.getAddress = async (req, res, next) => {
  let { user } = req
  user = user ? user : {}
  let { user_id } = user

  let addressList = await Model.Address.findAll({
    where: { user_id },
    attributes: ['address_id', 'address', 'state', 'city', 'pincode', 'latitude', 'longitude']
  })

  res.json({
    error: false,
    msg: "Addresses Fetched Successfully.",
    data: addressList
  })
};

exports.updateAddress = async (req, res, next) => {
  let { user, body, addressData } = req
  body = body ? body : {}
  user = user ? user : {}
  addressData = addressData ? addressData : {}
  let { user_id } = user
  let { address, state, city, pincode, latitude, longitude } = body
  let { user_id: addUserId, address_id } = addressData

  if (user_id !== addUserId)
    throw { error: true, msg: "Unauthorized address.", status: 401 }

  let data = {}

  if (address) data['address'] = address
  if (state) data['state'] = state
  if (city) data['city'] = city
  if (pincode) data['pincode'] = pincode
  if (latitude) data['latitude'] = latitude
  if (longitude) data['longitude'] = longitude

  await Model.Address.update({ ...data }, {
    where: { address_id }
  })

  res.json({
    error: false,
    msg: "Address Updated Successfully.",
    data: address_id
  })
};

exports.deleteAddress = async (req, res, next) => {
  let { user, addressData } = req
  user = user ? user : {};
  addressData = addressData ? addressData : {};
  let { user_id } = user
  let { user_id: addUserId, address_id } = addressData

  if (user_id !== addUserId)
    throw { error: true, msg: "Unauthorized address.", status: 401 }

  let userData = await Model.User.findOne({
    where: { user_id },
    attributes: ['defaultAddressId']
  });

  userData = userData && userData.dataValues ? userData.dataValues : {}
  let { defaultAddressId } = userData

  if (defaultAddressId === address_id)
    throw { error: true, msg: "Cannot delete default address.", status: 400 }

  await Model.Address.destroy({
    where: { address_id }
  })

  res.json({
    error: false,
    msg: "Address Deleted Successfully.",
    data: address_id
  })
};

exports.getAddressById = async (req, res, next, id) => {
  let address = await Model.Address.findOne({
    where: { address_id: id },
    attributes: ['user_id', 'address_id', 'address', 'state', 'city', 'pincode', 'latitude', 'longitude']
  })
  if (address && address.dataValues) {
    req['addressData'] = address.dataValues
    next();
  } else {
    throw { error: true, msg: "address not found.", status: 400 }
  }
};

exports.AddDeliveryPerson = async (req, res, next) => {
  let { user, body } = req
  body = body ? body : {}
  user = user ? user : {}
  let { restaurant_id } = user
  let {
    name,
    phoneNo,
    vehicalName,
    vehicalNumber
  } = body

  if (!restaurant_id) {
    res.status(400).json({
      error: true,
      msg: "Error while Adding Delivery Person."
    })
  } else {
    let addressData = await Model.PersonDelivery.create({
      name,
      phoneNo:String(phoneNo),
      vehicalName,
      vehicalNumber,
      restaurant_id
    })
    res.json({
      error: false,
      msg: "Delivery Person Addedd successfully."
    })
  }
}

exports.DeleteDeliveryPerson = async (req, res, next) => {
  let { user, params } = req
  user = user ? user : {}
  params = params ? params : {}
  let { restaurant_id } = user
  let { person_id } = params

  if (!restaurant_id) {
    res.status(400).json({
      error: true,
      msg: "Error while Deleting Delivery Person."
    })
  } else {
    await Model.PersonDelivery.destroy({
      where: { restaurant_id, person_id }
    })
    res.json({
      error: false,
      msg: "Delivery deleted successfully.",
    })
  }
}

exports.getDeliveryPersonList = async (req, res, next) => {
  let { user } = req
  user = user ? user : {}
  let { restaurant_id } = user

  if (!restaurant_id) {
    res.status(400).json({
      error: true,
      msg: "Error while Fetching Delivery Person."
    })
  } else {
    let deliveryPersonList = await Model.PersonDelivery.findAll({
      where: { restaurant_id }
    })
    res.json({
      error: false,
      msg: "Delivery Person Fetched successfully.",
      data: deliveryPersonList
    })
  }
}