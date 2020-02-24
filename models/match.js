'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    pet_id: DataTypes.INTEGER
  }, {});
  match.associate = function (models) {
    // associations can be defined here
    match.belongsTo(models.pet, {
      foreignKey: "pet_id_match"
    });
  };
  return match;
};