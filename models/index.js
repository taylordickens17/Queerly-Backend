const UserModel = require("./user");
const ExperienceModel = require("./experience");
const BusinessModel = require("./business");

UserModel.hasMany(ExperienceModel);
ExperienceModel.belongsTo(UserModel);

BusinessModel.hasMany(ExperienceModel);
ExperienceModel.belongsTo(BusinessModel);

module.exports = {
  UserModel,
  ExperienceModel,
  BusinessModel,
};
