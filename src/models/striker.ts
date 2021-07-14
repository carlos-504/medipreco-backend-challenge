'use strict';
import { Model } from 'sequelize';
import { StrikerAttributes } from '../interfaces/striker';
import { max, min } from '../utils/validationsMessage.json';

module.exports = (sequelize: any, DataTypes: any) => {
  class Striker extends Model<StrikerAttributes> implements StrikerAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    topScorer!: Object[];
    goals!: number;

    static associate(models: any) {
      Striker.hasMany(models.Tournament, { foreignKey: 'StrikerId' });
    }
  }
  Striker.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      topScorer: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: {
            args: [1],
            msg: min,
          },
          max: {
            args: [60],
            msg: max,
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Striker',
    }
  );
  return Striker;
};
