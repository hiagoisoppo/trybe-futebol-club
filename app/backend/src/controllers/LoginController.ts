import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';
import CustomError from '../utils/CustomError';

export default class LoginController {
  private loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const response = await this.loginService.login({ email, password });
      res.status(response.statusCode).json(response.data);
    } catch (err: unknown) {
      err as CustomError;
      next(err);
    }
  }
}
