'use strict';
import { Model } from 'sequelize';
import { TournamentAttributes } from '../interfaces/tournament';
import { minYear, maxYear, notEmpty } from '../utils/validationsMessage.json';

module.exports = (sequelize: any, DataTypes: any) => {
  class Tournament
    extends Model<TournamentAttributes>
    implements TournamentAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    year!: string;
    first!: string;
    second!: string;
    third!: string;
    fourth!: string;

    static associate(models: any) {
      Tournament.belongsTo(models.Striker, { foreignKey: 'StrikerId' });
    }
  }
  Tournament.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: [1959],
            msg: minYear,
          },
          max: {
            args: [new Date().getFullYear()],
            msg: maxYear,
          },
        },
      },
      first: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: notEmpty,
          },
        },
      },
      second: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: notEmpty,
          },
        },
      },
      third: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: notEmpty,
          },
        },
      },
      fourth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: notEmpty,
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Tournament',
    }
  );
  return Tournament;
};
