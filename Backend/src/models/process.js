'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Process extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Process.belongsTo(models.Team, {
        foreignKey: 'teamId'
      });
    }
  }
  Process.init({
    teamId: DataTypes.INTEGER,
    paidImage: DataTypes.TEXT,
    isPaid: DataTypes.BOOLEAN,
    isUpdate: DataTypes.BOOLEAN,
    isHighSchool: DataTypes.BOOLEAN,
    trainerName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Process',
  });
  return Process;
};