import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/Match/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'teams' } },
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'teams' } },
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};