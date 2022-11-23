const { DataTypes } = require("sequelize");
const sequelize = require("..");

const PersonDelivery = sequelize.define("personDelivery", {
  person_id: {
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
  phoneNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicalNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PersonDelivery;
