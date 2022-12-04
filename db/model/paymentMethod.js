const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const PaymentMethod = sequelize.define("plan", {
  paymentMethod_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = PaymentMethod;
