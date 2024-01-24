'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Associate Event with Meet_Greet
      Event.belongsTo(models.Meet_Greet, {
        foreignKey: 'meet_greet_id',
        as: 'meetAndGreet'
      });
    }
  }

  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    meet_greet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Meet_Greets',
        key: 'meet_greet_id',
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });

  return Event;
};
