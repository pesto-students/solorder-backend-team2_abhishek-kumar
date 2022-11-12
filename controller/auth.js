const bcrypt = require('bcrypt');
const {pool,client} = require('../db');
const { expressError } = require('../util');
const jwt = require('jsonwebtoken');


exports.SignUp = async (req, res, next) => {
  try {
    await expressError(req, res)
    let { name, email, password, description } = req.body
    let emailResult = await pool.query("SELECT email FROM users WHERE email = $1", [email])
    if (emailResult && emailResult.rowCount) {
      throw { error: true, msg: "Email already used", status: 400 }
    }
    const password_salt = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    let result = await pool.query("INSERT INTO users(name,email,password_salt,description) VALUES($1,$2,$3,$4) RETURNING *", [name, email, password_salt, description])
    if (result && result.rowCount) {
      res.json({
        error: false,
        msg: "Sign Up successfully",
        result
      })
      res.end()
      return
    } else {
      throw { error: true, msg: "Sign Up failed", status: 400 }
    }
  } catch (error) {
    next(error)
  }
};

exports.SignIn = async (req, res, next) => {
  try {
    await expressError(req, res)
    let { email, password } = req.body
    let emailResult = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if (emailResult && emailResult.rowCount === 0) {
      throw { error: true, msg: "Email not found", status: 400 }
    }

    let user = emailResult && emailResult.rows && emailResult.rows[0] ? emailResult.rows[0] : {}
    if (!bcrypt.compareSync(password, user.password_salt)) {
      throw { error: true, msg: "Wrong Password", status: 400 }
    }

    delete user.password_salt

    let token = jwt.sign(user, process.env.JWT_PRIVATE_KEY);
    if (token) {
      res.json({
        error: false,
        msg: "Sign In successfully",
        data: { ...user, token }
      })
      res.end()
      return
    } else {
      throw { error: true, msg: "Sign Up failed", status: 400 }
    }
  } catch (error) {
    next(error)
  }
};


exports.SignOut = async (req, res, next) => {
  try {
    await expressError(req, res)
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
  } catch (error) {
    next(error)
  }
};