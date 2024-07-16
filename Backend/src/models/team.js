'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Team.hasMany(models.Participant, {
        foreignKey: 'teamId'
      });
      Team.hasOne(models.Process, {
        foreignKey: 'teamId'
      });
      Team.hasMany(models.Request, {
        foreignKey: 'teamId'
      });

    }
  }
  Team.init({
    userId: DataTypes.INTEGER,
    teamName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};