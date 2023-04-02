const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const MenuCategory = sequelize.define("menuCategory", {
  category_id: {
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

module.exports = MenuCategory;
