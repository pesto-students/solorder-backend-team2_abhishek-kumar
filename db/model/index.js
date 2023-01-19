const Orders = require("./orders");
const Address = require("./address");
const MenuCategory = require("./menuCategory");
const MenuItem = require("./menuItem");
const PersonDelivery = require("./personDelivery");
const Plan = require("./plan");
const Restaurant = require("./restaurant");
const User = require("./user");
const Transaction = require("./transaction");
const OrderStatus = require("./orderStatus");

const Model = {
  Address,
  MenuCategory,
  MenuItem,
  PersonDelivery,
  Plan,
  Restaurant,
  User,
  Orders,
  Transaction,
  OrderStatus,
}

module.exports = Model