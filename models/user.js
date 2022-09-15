const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sexuality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pronouns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
