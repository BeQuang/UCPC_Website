'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.Team, {
        foreignKey: 'teamId'
      });
    }
  }
  Request.init({
    teamId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    data: DataTypes.TEXT,
    response: DataTypes.TEXT,
    isSolve: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};