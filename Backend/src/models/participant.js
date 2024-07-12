'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.Team, {
        foreignKey: 'teamId'
      });
    }
  }
  Participant.init({
    teamId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    citizenId: DataTypes.STRING,
    phone: DataTypes.STRING,
    birth: DataTypes.DATE,
    schoolName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};