"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      breednder: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
