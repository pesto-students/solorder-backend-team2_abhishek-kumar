const { DataTypes } = require("sequelize");
const {sequelize} = require("..");

const Plan = sequelize.define("plan", {
  plan_id: {
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
  noOfdays: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Plan;
