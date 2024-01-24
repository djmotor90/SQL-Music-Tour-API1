//'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate(models) {
    }
  }
  Band.init(
    {
      band_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
      },
      name: DataTypes.STRING,
      genre: DataTypes.TEXT,
      available_start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Band',
    }
  );
  return Band;
};
