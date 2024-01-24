//models/meet_greet.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event'
      });
      this.belongsTo(models.Band, {
        foreignKey: 'band_id',
        as: 'band'
      });
    }
  }

  Meet_Greet.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    meet_start_time: DataTypes.DATE,
    meet_end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meet_Greet',
    tableName: 'Meet_Greets'
  });

  return Meet_Greet;
};
