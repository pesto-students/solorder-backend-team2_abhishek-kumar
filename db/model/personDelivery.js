const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const PersonDelivery = sequelize.define("personDelivery", {
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicalNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PersonDelivery;
