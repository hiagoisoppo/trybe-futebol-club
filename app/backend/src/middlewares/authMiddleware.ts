import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import TokenManager from '../utils/TokenManager';

interface AuthRequest extends Request {
  user: {
    username: string;
    role: string;
  };
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError('Token not found', 401);
    }

    const tokenData = TokenManager.validate(TokenManager.extract(authorization));
    req.user = tokenData;

    next();
  } catch (err: unknown) {
    err as CustomError;
    next(err);
  }
}

export default authMiddleware;
