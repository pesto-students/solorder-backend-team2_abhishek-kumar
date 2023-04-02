const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const User = sequelize.define("user", {
  user_id: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  encrypt_psw: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  defaultAddressId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

module.exports = User;
