'use strict';
module.exports = (sequelize, DataTypes) => {
  const ages = sequelize.define('ages', {
    age: DataTypes.STRING
  }, {});
  ages.associate = function(models) {
    // associations can be defined here
  };
  return ages;
};