'use strict';
import { Model } from 'sequelize';

interface StrikerAttributes {
  id: number;
  name: Object[];
  goals: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Striker extends Model<StrikerAttributes> implements StrikerAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    name!: Object[];
    goals!: number;

    static associate(models: any) {
      // define association here
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
      name: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Striker',
    }
  );
  return Striker;
};
