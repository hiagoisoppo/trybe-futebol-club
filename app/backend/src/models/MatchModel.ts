import { MatchGoals } from '../Interfaces/Match/MatchGoals';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import { MatchLessId } from '../Interfaces/Match/MatchLessId';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  public async find(id: number): Promise<SequelizeMatch | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  public async list(): Promise<SequelizeMatch[]> {
    const matches = await this.model.findAll();
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
}
