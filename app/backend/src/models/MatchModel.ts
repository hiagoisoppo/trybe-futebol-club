import { QueryTypes } from 'sequelize';
import { MatchGoals } from '../Interfaces/Match/MatchGoals';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import { MatchLessId } from '../Interfaces/Match/MatchLessId';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamStats from '../Interfaces/ITeamStats';
import { listAwayTeamStatsQuery, listHomeTeamStatsQuery, listTeamStatsQuery } from './querys';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public async find(id: number): Promise<SequelizeMatch | null> {
    const match = await this.model.findByPk(id, { include: ['homeTeam', 'awayTeam'] });
    return match;
  }

  public async list(): Promise<SequelizeMatch[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam,
          attributes: ['teamName'],
          as: 'homeTeam',
        },
        {
          model: SequelizeTeam,
          attributes: ['teamName'],
          as: 'awayTeam',
        }],
    });

    return matches;
  }

  public async listInProgress(inProgress: boolean): Promise<SequelizeMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: SequelizeTeam,
          attributes: ['teamName'],
          as: 'homeTeam',
        },
        {
          model: SequelizeTeam,
          attributes: ['teamName'],
          as: 'awayTeam',
        }],
    });
    return matches;
  }

  public async create(data: MatchLessId): Promise<SequelizeMatch> {
    const newMatch = await this.model.create(data);
    return newMatch;
  }

  public async update(id: number, data: MatchGoals): Promise<SequelizeMatch | null> {
    await this.model.update(data, { where: { id } });
    const updatedMatch = await this.model.findByPk(id);
    return updatedMatch;
  }

  public async finish(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async listHomeTeamStats(): Promise<ITeamStats[]> {
    const matches = await this.model.sequelize?.query(
      listHomeTeamStatsQuery,
      { type: QueryTypes.SELECT },
    ) as ITeamStats[];

    return matches;
  }

  public async listAwayTeamStats(): Promise<ITeamStats[]> {
    const matches = await this.model.sequelize?.query(
      listAwayTeamStatsQuery,
      { type: QueryTypes.SELECT },
    ) as ITeamStats[];

    return matches;
  }

  public async listTeamStats(): Promise<ITeamStats[]> {
    const matches = await this.model.sequelize?.query(
      listTeamStatsQuery,
      { type: QueryTypes.SELECT },
    ) as ITeamStats[];

    return matches;
  }
}
