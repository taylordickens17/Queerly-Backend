const { DataTypes } = require("sequelize");
const db = require("../db");

const Experience = db.define("experience", {
  rating: {
    type: DataTypes.ENUM("1", "2", "3", "4", "5"),
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  safeSpace: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  anon: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
});

module.exports = Experience;
