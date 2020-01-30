'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Author.associate = (models) => {
    Author.hasMany(models.Post)
    // associations can be defined here
  };
  return Author;
};