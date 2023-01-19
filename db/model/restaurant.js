const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

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
  address: {
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
    type: DataTypes.DECIMAL,
    // allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL,
    // allowNull: false,
  },
  deliveryRange: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  deliveryTime: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    // allowNull: false,
  },
  daysToExpire: {
    type: DataTypes.INTEGER,
    // allowNull: false,
  },
  stepCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    // allowNull: false,
  },
  cuisines: {
    type: DataTypes.JSONB,
    // allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
    defaultValue:true,
  },
  ratingList: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  avgRating: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  recipt_id: {
    type: DataTypes.STRING,
    // allowNull: false,
    // autoIncrement: true,
    unique: true,
    // primaryKey: true
  },
  plan_id: {
    type: DataTypes.STRING,
    // allowNull: false,
    // autoIncrement: true,
    // unique: true,
    // primaryKey: true
  },
});

module.exports = Restaurant;
