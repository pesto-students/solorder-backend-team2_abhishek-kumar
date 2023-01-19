const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

const Transaction = sequelize.define("transaction", {
  recipt_id: {
    type: DataTypes.STRING,
    allowNull: false,
    // autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.STRING,
    unique: true,
    // allowNull: false,
  },
  payment_id: {
    type: DataTypes.STRING,
    unique: true,
    // allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  dateTime: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
});

module.exports = Transaction;
