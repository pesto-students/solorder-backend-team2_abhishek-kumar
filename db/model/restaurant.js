const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Restaurant = sequelize.define("restaurant", {
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  pincode: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    MAX_VALUE: 999999
  },
  latitude: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  longitude: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  deliveryTime: {
    type: DataTypes.TIME,
    // allowNull: false,
  },
  costForTwo: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  galaryImgs: {
    type: DataTypes.JSON
  },
  purchaseDate: {
    type: DataTypes.DATE,
    // allowNull: false,
  },
  daysToExpire: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  stepCompleted: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  cuisines: {
    type: DataTypes.JSON,
    // allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
  },
  rating: {
    type: DataTypes.JSON
  },
});

module.exports = Restaurant;
