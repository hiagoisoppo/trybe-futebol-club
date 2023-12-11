import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async create(req: Request, res: Response) {
    const { username, role, email, password } = req.body;
    const user = await this.userService.create({ username, role, email, password });
    res.status(user.statusCode).json(user.data);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, role, email, password } = req.body;
    const user = await this.userService.update(Number(id), { username, role, email, password });
    res.status(user.statusCode).json(user.data);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.userService.delete(Number(id));
    res.status(204).json();
  }
}
