const { validationResult } = require('express-validator');
const multiparty = require('multiparty');
const Sentry = require("@sentry/node");
var logCount = 1

exports.expressError = (req, res) => {
  return new Promise((resolve, reject) => {
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => (msg));
    if (!result.isEmpty()) {
      let errArr = result.array()
      reject({ error: true, msg: (errArr.length == 1) ? errArr[0] : errArr, status: 400 })
    }
    resolve(true)
  })
}

exports.errorHandler = (err, req, res, next) => {
  console.log(`=== Error Log.No.${logCount++}::${new Date()} ===`)
  console.log(err)
  err = err ? err : {}
  let { msg, status, message } = err;
  res.status(status || 500).json({
    error: true,
    msg: msg || message || "Internal server error",
  });
  if (!status)
    next(err)
  else
    res.end()
};

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
  try {
    var form = new multiparty.Form();
    let formData = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err)
          reject({ error: true, msg: err.message, status: 400 })
        resolve({ fields, files })
      });
    })
    next(formData);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}