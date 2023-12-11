import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

  public async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.teamService.find(Number(id));
      res.status(response.statusCode).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.teamService.list();
      res.status(response.statusCode).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { teamName } = req.body;
      const response = await this.teamService.create({ teamName });
      res.status(response.statusCode).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { teamName } = req.body;
      const response = await this.teamService.update(Number(id), { teamName });
      res.status(response.statusCode).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.teamService.delete(Number(id));
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
