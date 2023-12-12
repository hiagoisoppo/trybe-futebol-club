import { Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import TokenManager from '../utils/TokenManager';
import AuthRequest from '../Interfaces/AuthRequest';
import UserModel from '../models/UserModel';

export default async function authMiddleware(req: AuthRequest, _res: Response, next: NextFunction) {
  const userModel = new UserModel();
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError('Token not found', 401);
    }

    const tokenData = TokenManager.validate(TokenManager.extract(authorization));
    const user = await userModel.find(tokenData.id);
    if (!user || user.dataValues.username !== tokenData.username) {
      throw new CustomError('Token invalid', 401);
    }
    req.user = tokenData;

    next();
  } catch (err: unknown) {
    err as CustomError;
    next(err);
  }
}
