import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import AuthRequest from '../Interfaces/AuthRequest';

export default class LoginController {
  private loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.loginService.login({ email, password });
    res.status(response.statusCode).json(response.data);
  }

  public async getRole(req: AuthRequest, res: Response) {
    const response = await this.loginService.getRole(req.user?.id);
    res.status(response.statusCode).json(response.data);
  }
}
