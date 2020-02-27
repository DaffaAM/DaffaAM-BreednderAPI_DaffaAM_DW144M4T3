"use strict";
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define(
    "match",
    {
      pet_id: DataTypes.INTEGER,
      pet_id_match: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  match.associate = function(models) {
    // associations can be defined here
    match.belongsTo(models.pet, {
      foreignKey: "pet_id_match"
    });

    match.belongsTo(models.pet, {
      foreignKey: "pet_id"
    });
  };
  return match;
};
