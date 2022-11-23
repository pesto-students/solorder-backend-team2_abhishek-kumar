const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Orders = sequelize.define("orders", {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  itemIds: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  itemTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliveryFees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taxAndCharges: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estimateDeliveryTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
  },
  orderTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deliveryime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Orders;
