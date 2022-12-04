const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const MenuItem = sequelize.define("menuItem", {
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isVeg: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  rating: {
    type: DataTypes.JSON
  },
});

module.exports = MenuItem;
