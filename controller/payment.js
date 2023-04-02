const { cloudinary } = require('../db');
const Model = require('../db/model');
const RpayInstance = require('../helper/payment');
var crypto = require("crypto");

let planList = [{ id: 1, amount: 0, days: 15 }, { id: 2, amount: 60, days: 30 }, { id: 2, amount: 600, days: 365 }];

exports.GenerateOrder = async (req, res, next) => {
  let { body, user, restaurant } = req
  body = body ? body : {}
  user = user ? user : {}

  var options = {
    amount: body?.amount || null,  // amount in the smallest currency unit
    currency: "INR",
    receipt: body?.receipt || null
  };

  let paymentProm = new Promise((resolve, reject) => {
    RpayInstance.orders.create(options, function (err, order) {
      if (err) {
        reject(err)
      } else {
        resolve(order)
      }
    });
  })

  let orderData = await Promise.resolve(paymentProm);

  res.json({
    error: false,
    msg: "Order Id generated successfully.",
    data: orderData
  })
};

exports.SaveTransaction = async (req, res, next) => {
  let { body, user } = req
  body = body ? body : {}
  user = user ? user : {}

  let { user_id, restaurant_id } = user
  let { recipt_id, order_id, payment_id, amount, dateTime, plan_id, signature, user_id: userId } = body

  let cryptoBody = (order_id + "|" + payment_id);

  var generated_signature = crypto.createHmac('sha256', process.env.RAZOR_KEY_SECRET).update(cryptoBody.toString()).digest('hex');

  if ((plan_id === 2) && generated_signature !== signature) {
    res.status(401).json({
      error: false,
      msg: "Payment verification failed."
    });
  } else if (userId !== user_id) {
    res.status(401).json({
      error: false,
      msg: "Unauthorized User."
    });
  } else {
    if (restaurant_id && plan_id) {
      let restaurant = await Model.Restaurant.findOne({ where: { restaurant_id: restaurant_id } })
      let daysToExpire = restaurant?.daysToExpire ? (restaurant.daysToExpire + planList[Number(plan_id) - 1].days) : planList[Number(plan_id) - 1].days;
      await Model.Restaurant.update({ recipt_id, daysToExpire, purchaseDate: dateTime, plan_id }, {
        where: {
          restaurant_id
        }
      });
    }

    let paymentDetails = await Model.Transaction.create({ recipt_id, order_id, payment_id, amount, user_id, dateTime });

    res.json({
      error: false,
      msg: "Payment Done successfully.",
      data: paymentDetails
    })
  }
};