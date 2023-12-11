import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import CustomError from '../utils/CustomError';
import { ILogin } from '../Interfaces/ILogin';
import TokenManager from '../utils/TokenManager';
import Schema from '../schemas/login.schema';

export default class LoginService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  public async login({ email, password }: ILogin): Promise<ServiceResponse<{ token: string }>> {
    const { error } = Schema.login.validate({ email, password });
    if (error) {
      throw new CustomError('All fields must be filled', 401);
    }

    const userFound = await this.userModel.findByEmail(email);
    if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
      throw new CustomError('Invalid email or password', 401);
    }

    const token = TokenManager.generate({
      username: userFound.username,
      role: userFound.role,
    });

    return { statusCode: 200, data: { token } };
  }
}
