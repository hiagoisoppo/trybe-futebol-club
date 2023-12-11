import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

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
}
