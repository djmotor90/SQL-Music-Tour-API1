'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    static associate(models) {
      // Associate Stage with Event via event_id
      Stage.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event'
      });
    }
  }

  Stage.init({
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_name: DataTypes.STRING,
    event_id: DataTypes.INTEGER // Associate with Event
  }, {
    sequelize,
    modelName: 'Stage',
  });

  return Stage;
};
