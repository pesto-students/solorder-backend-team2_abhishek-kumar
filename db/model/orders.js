const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const Orders = sequelize.define("orders", {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  user_id:  {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  totalCost: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  estimateDeliveryTime: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  recipt_id: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  orderTime: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  deliveryTime: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  items: {
    type: DataTypes.JSONB,
    // allowNull: false,
  },
  orderAddress: {
    type: DataTypes.JSONB,
    // allowNull: false,
  },
  deliveryPerson: {
    type: DataTypes.JSONB,
    // allowNull: false,
  },
  orderStatus_Id:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
    // allowNull: false,
  }
});

module.exports = Orders;
