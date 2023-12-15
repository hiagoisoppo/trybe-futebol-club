import { MatchGoals } from '../Interfaces/Match/MatchGoals';
import IMatch from '../Interfaces/Match/IMatch';
import { IMatchService } from '../Interfaces/Match/IMatchService';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import CustomError from '../utils/CustomError';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { MatchLessId } from '../Interfaces/Match/MatchLessId';

const matchFoundError = 'Match not found';

export default class MatchService implements IMatchService {
  private matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  public async create(data: MatchLessId): Promise<ServiceResponse<SequelizeMatch>> {
    if (data.homeTeamId === data.awayTeamId) {
      throw new CustomError('It is not possible to create a match with two equal teams', 422);
    }

    const homeTeam = await this.matchModel.find(data.homeTeamId);
    const awayTeam = await this.matchModel.find(data.awayTeamId);
    if (!homeTeam || !awayTeam) throw new CustomError('There is no team with such id!', 404);

    const newMatch = await this.matchModel.create(data);
    return { statusCode: 201, data: newMatch };
  }

  public async find(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.find(id);
    if (!match) throw new CustomError(matchFoundError, 404);

    return { statusCode: 200, data: match };
  }

  public async list(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    switch (inProgress) {
      case 'true': {
        const matches = await this.matchModel.listInProgress(true);
        return { statusCode: 200, data: matches };
      }
      case 'false': {
        const matches = await this.matchModel.listInProgress(false);
        return { statusCode: 200, data: matches };
      }
      default: {
        const matches = await this.matchModel.list();
        return { statusCode: 200, data: matches };
      }
    }
  }

  public async update(
    id: number,
    data: MatchGoals,
  ): Promise<ServiceResponse<SequelizeMatch | null>> {
    const match = await this.matchModel.find(id);
    if (!match) throw new CustomError(matchFoundError, 404);

    const updatedMatch = await this.matchModel.update(id, data);
    return { statusCode: 200, data: updatedMatch };
  }

  public async finish(id: number): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.matchModel.find(id);
    if (!match) throw new CustomError(matchFoundError, 404);

    await this.matchModel.finish(id);
    return { statusCode: 200, data: { message: 'Finished' } };
  }
}
