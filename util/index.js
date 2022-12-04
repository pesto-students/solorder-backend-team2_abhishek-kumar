const { validationResult } = require('express-validator');
const multiparty = require('multiparty');
const Sentry = require("@sentry/node");
var logCount = 1

const expressError = (req, res) => {
  return new Promise((resolve, reject) => {
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => (msg));
    if (!result.isEmpty()) {
      let errArr = result.array()
      reject({ error: true, msg: (errArr.length == 1) ? errArr[0] : errArr, status: 400 })
    }
    resolve(true)
  })
}
exports.expressError = expressError

const errorHandler = (err, req, res, next) => {
  err = err ? err : {}
  let { msg, status, message } = err;
  if (!status) {
    console.log(`=== Error Log.No.${logCount++}::${new Date()} ===`)
    console.log(err)
  }
  let resData;
  if (status) {
    resData = {
      error: true,
      msg: msg || "Something went wrong!",
    }
  } else {
    resData = {
      error: true,
      msg: msg || "Something went wrong!",
      serverMsg: message
    }
  }
  res.status(status || 500).json(resData);
  res.end()
};
exports.errorHandler = errorHandler

exports.sentryErrorHandler = (err, req, res, next) => {
  const transaction = Sentry.startTransaction({
    op: `=== Error Log.No.${logCount}::${new Date()} ===`,
    name: "Solorder BE",
  });
  setTimeout(() => {
    Sentry.captureException(err);
    transaction.finish();
  }, 99);
  res.end()
};

exports.ParseFormData = async (req, res, next) => {
  var form = new multiparty.Form();
  let formData = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err)
        reject({ error: true, msg: err.message, status: 400 })
      resolve({ fields, files })
    });
  })
  req.formData = formData
  next();
}

exports.ValidateTryCatch = (controller) => async (...args) => {
  let next = args.find((v) => (["next","paramCallback"].includes(v?.name)))
  try {
    !next && console.log("Can't Detect next func");
    await expressError(...args);
    await controller(...args);
  } catch (error) {
    next ? next(error) : errorHandler(error, ...args)
  }
};
