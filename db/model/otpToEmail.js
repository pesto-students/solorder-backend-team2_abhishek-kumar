const { DataTypes } = require("sequelize");
const { sequelize } = require("..");

const OtpToEmail = sequelize.define("otpToEmail", {
  otp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = OtpToEmail;
