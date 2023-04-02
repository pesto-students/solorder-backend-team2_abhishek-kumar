const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const OrderStatus = sequelize.define("orderStatus", {
  orderStatus_Id: {
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

module.exports = OrderStatus;
