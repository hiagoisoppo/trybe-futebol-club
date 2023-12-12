import { Request } from 'express';

export default interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}
