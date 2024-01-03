import ITeamStats from '../Interfaces/ITeamStats';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class LeaderBoardService {
  private model: MatchModel;

  constructor() {
    this.model = new MatchModel();
  }

  public async list(teamFrom: string): Promise<ServiceResponse<ITeamStats[]>> {
    if (teamFrom === 'home') {
      const results = await this.model.listHomeTeamStats();
      return { statusCode: 200, data: results };
    }

    if (teamFrom === 'away') {
      const results = await this.model.listAwayTeamStats();
      return { statusCode: 200, data: results };
    }

    const results = await this.model.listTeamStats();
    return { statusCode: 200, data: results };
  }
}
