import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import CustomError from '../utils/CustomError';

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, role, email, password } = req.body;
      const response = await this.userService.create({ username, role, email, password });
      res.status(response.statusCode).json(response.data);
    } catch (err: unknown) {
      err as CustomError;
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { username, role, email, password } = req.body;
      const response = await this.userService.update(
        Number(id),
        { username, role, email, password },
      );
      res.status(response.statusCode).json(response.data);
    } catch (err: unknown) {
      err as CustomError;
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.userService.delete(Number(id));
      res.status(204).json();
    } catch (err: unknown) {
      err as CustomError;
      next(err);
    }
  }
}
