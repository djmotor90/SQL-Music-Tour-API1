'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stage_Event extends Model {
    static associate(models) {
      // Associate Stage_Event with Event via event_id
      Stage_Event.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event'
      });
    }
  }

  Stage_Event.init({
    stage_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stage_Event',
  });

  return Stage_Event;
};
