import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  private service: LeaderBoardService;
  constructor() {
    this.service = new LeaderBoardService();
  }

  public async listHome(req: Request, res: Response) {
    const response = await this.service.list('home');
    res.status(response.statusCode).json(response.data);
  }

  public async listAway(req: Request, res: Response) {
    const response = await this.service.list('away');
    res.status(response.statusCode).json(response.data);
  }

  public async list(req: Request, res: Response) {
    const response = await this.service.list('');
    res.status(response.statusCode).json(response.data);
  }
}
