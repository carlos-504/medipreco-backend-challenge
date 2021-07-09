'use strict';
import { Model } from 'sequelize';

interface TournamentAttributes {
  id: number;
  year: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
}

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
      },
      first: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      second: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      third: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fourth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tournament',
    }
  );
  return Tournament;
};
