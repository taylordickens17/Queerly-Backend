const { DataTypes } = require("sequelize");
const db = require("../db");

const Business = db.define("business", {
  name: {
    type: DataTypes.STRING(100),
  },
  zipCode: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  businessType: {
    type: DataTypes.ENUM("", "", "", "", "", "", "", "", ""),
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Business;
