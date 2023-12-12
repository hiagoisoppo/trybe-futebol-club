import * as jwt from 'jsonwebtoken';
import ITokenPayload from '../Interfaces/ITokenPayload';
import CustomError from './CustomError';

const secret = process.env.JWT_SECRET || 'secret';

function generate(payload: ITokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function extract(bearerToken: string): string {
  return bearerToken.split(' ')[1];
}

function validate(token: string): ITokenPayload {
  try {
    const data = jwt.verify(token, secret) as ITokenPayload;
    return data;
  } catch (err: unknown) {
    throw new CustomError('Token must be a valid token', 401);
  }
}

export default {
  generate,
  extract,
  validate,
};
