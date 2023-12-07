import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

function errorMiddleware(error: CustomError, _req: Request, res: Response, _next: NextFunction) {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  console.log(error);
  return res.status(status).json({ message });
}

export default errorMiddleware;
