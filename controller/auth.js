const bcrypt = require('bcrypt');
const Model = require('../db/model');
const jwt = require('jsonwebtoken');

exports.SignUp = async (req, res, next) => {
  let { name, email, password, role_id } = req.body

  // let emailResult = await Model.User.findOne({ where: { email } });
  // if (emailResult) {
  //   throw { error: true, msg: "Email already used.", status: 400 }
  // }
  const password_salt = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));

  let userData = await Model.User.create({ name, email, role_id, encrypt_psw: password_salt });

  let { user_id } = userData
  let resData = { user_id, name, email, role_id }

  if (role_id === 2 && userData) {
    let restaurant = await Model.Restaurant.create({ user_id });
    let { restaurant_id } = restaurant
    await Model.User.update({ restaurant_id }, {
      where: {
        user_id
      }
    });
    resData["restaurant_id"] = restaurant_id
  }

  if (userData) {
    res.json({
      error: false,
      msg: "Sign Up successfully.",
      data: resData
    })
    res.end()
    return
  } else {
    throw { error: true, msg: "Sign Up failed.", status: 400 }
  }
};

exports.SignIn = async (req, res, next) => {
  let { email, password } = req.body
  let userData = await Model.User.findOne({ where: { email } });

  if (!userData) {
    throw { error: true, msg: "Email not found", status: 400 }
  }
  userData = userData && userData.dataValues ? userData.dataValues : {}

  let { user_id, name, encrypt_psw, role_id, restaurant_id, defaultAddressId } = userData

  if (!bcrypt.compareSync(password, encrypt_psw)) {
    throw { error: true, msg: "Wrong Password", status: 400 }
  }

  let token = jwt.sign({ user_id, name, email, role_id, restaurant_id, defaultAddressId }, process.env.JWT_PRIVATE_KEY);

  if (token) {
    res.json({
      error: false,
      msg: "Sign In successfully",
      data: { user_id, name, email, role_id, restaurant_id, defaultAddressId },
      token
    })
    res.end()
    return
  } else {
    throw { error: true, msg: "Sign In failed", status: 400 }
  }
};


exports.SignOut = async (req, res, next) => {
  let { token } = req.headers
  if (!token) {
    throw { error: true, msg: "Token did not found", status: 400 }
  }

  var user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  if (user) {
    res.json({
      error: false,
      msg: "Sign Out successfully"
    })
    res.end()
    return
  } else {
    throw { error: true, msg: "User Didn't sign in", status: 400 }
  }
};

exports.Authenticate = async (req, res, next) => {
  let { token } = req.headers
  if (!token) {
    throw { error: true, msg: "Unauthorized access", status: 401 }
  }
  var user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (user) {
    req['user'] = user
    return next()
  } else {
    throw { error: true, msg: "Authentication failed", status: 400 }
  }
};