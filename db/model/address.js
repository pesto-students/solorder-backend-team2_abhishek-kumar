const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const Address = sequelize.define("address", {
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    MAX_VALUE: 999999
  },
  latitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Address;
