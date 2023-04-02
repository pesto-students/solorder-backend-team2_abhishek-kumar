const bcrypt = require('bcrypt');
const Model = require('../db/model');
const jwt = require('jsonwebtoken');
const { otpTamplet, generateOTP } = require('../helper/otpTemplet');
const transporter = require('../helper/nodemailerInit');

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

exports.SendOtp = async (req, res, next) => {
  let { email } = req.body
  let userData = await Model.User.findOne({ where: { email } });

  if (!userData) {
    throw { error: true, msg: "Email not found", status: 400 }
  }

  let otp = generateOTP()
  let isOtpPresent = await Model.OtpToEmail.findOne({ where: { email } });
  let otpData = null

  if (isOtpPresent) {
    otpData = await Model.OtpToEmail.update({ otp, isVerified: false }, {
      where: {
        email
      }
    });
  } else {
    otpData = await Model.OtpToEmail.create({ email, otp, isVerified: false });
  }

  if (otpData) {

    const sender = {
      email: 'naveenmohanty3@gmail.com',
      name: 'Solorder',
    }
    const receivers = [
      {
        email: email,
      },
    ]

    let info = await transporter.sendTransacEmail({
      sender: sender,
      to: receivers,
      subject: "Reset password OTP",
      textContent: `Dear ${userData?.name || ""}, Your OTP is: ${otp || ""}`,
      htmlContent: otpTamplet(userData?.name, otp),
      params: {
        role: 'Frontend',
      },
    })
    if (info?.messageId) {
      res.json({
        error: false,
        msg: "OTP send successfully to your email.",
        data: info?.messageId || null
      })
    } else {
      res.status(400).json({
        error: true,
        msg: "Unable to send OTP."
      })
    }
  } else {
    res.status(400).json({
      error: true,
      msg: "Unable to send OTP."
    })
  }
  res.end()
};

exports.ValidateOtp = async (req, res, next) => {
  let { email, otp } = req.body
  let otpData = await Model.OtpToEmail.findOne({ where: { email } });

  if (otpData?.otp === otp) {
    if (otpData?.isVerified === false) {
      await Model.OtpToEmail.update({ isVerified: true }, {
        where: {
          email
        }
      });
      res.json({
        error: false,
        msg: "OTP verified successfully."
      })
    } else {
      res.status(400).json({
        error: true,
        msg: "Invalid OTP."
      })
    }
  } else {
    res.status(400).json({
      error: true,
      msg: "Invalid OTP."
    })
  }
  res.end()
};

exports.UpdatePasswordViaOtp = async (req, res, next) => {
  let { email, password, otp } = req.body
  let otpData = await Model.OtpToEmail.findOne({ where: { email } });
  let userData = await Model.User.findOne({ where: { email } });
  if ((otpData?.otp !== otp) || (otpData?.isVerified === false)) {
    res.status(400).json({
      error: true,
      msg: "Unable to update password."
    })
  } else if (userData) {
    const password_salt = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    await Model.User.update({ encrypt_psw: password_salt }, {
      where: {
        user_id: userData?.user_id || null
      }
    });
    res.json({
      error: false,
      msg: "Password Updated successfully."
    })
  } else {
    res.status(400).json({
      error: true,
      msg: "Unable to update password."
    })
  }
  res.end()
};