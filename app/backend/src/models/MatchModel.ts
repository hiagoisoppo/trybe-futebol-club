import { QueryTypes } from 'sequelize';
import { MatchGoals } from '../Interfaces/Match/MatchGoals';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import { MatchLessId } from '../Interfaces/Match/MatchLessId';
import SequelizeTeam from '../database/models/SequelizeTeam';

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

  public async listHomeTeamStats(): Promise<unknown> {
    const matches = await this.model.sequelize?.query(`SELECT teams.team_name AS name,
      SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END ) AS total_points,
      COUNT(matches.id) AS total_games,
      SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 
        END) AS total_victories,
      SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 
        END) AS total_draws,
      SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 
        END) AS total_Losses,
      SUM(home_team_goals) AS goals_favor,
      SUM(away_team_goals) AS goals_own
    FROM matches
    LEFT JOIN teams ON teams.id = matches.home_team_id
    GROUP BY name;
    `, { type: QueryTypes.SELECT });

    return matches;
  }

  public async listAwayTeamStats(): Promise<SequelizeMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: false },
      include: [
        {
          model: SequelizeTeam,
          attributes: ['teamName'],
          as: 'awayTeam',
        }],
      group: ['awayTeamId'],
    });

    return matches;
  }
}
