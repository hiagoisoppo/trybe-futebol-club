import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private matchService: MatchService;
  constructor() {
    this.matchService = new MatchService();
  }

  public async list(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchService.list(inProgress as string);
    res.status(response.statusCode).json(response.data);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.update(Number(id), { homeTeamGoals, awayTeamGoals });
    res.status(response.statusCode).json(response.data);
  }

  public async finish(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.finish(Number(id));
    res.status(response.statusCode).json(response.data);
  }

  public async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this.matchService.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    res.status(response.statusCode).json(response.data);
  }
}
