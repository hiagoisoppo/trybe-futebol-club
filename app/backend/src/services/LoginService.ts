import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import CustomError from '../utils/CustomError';
import { ILogin } from '../Interfaces/ILogin';
import TokenManager from '../utils/TokenManager';

export default class LoginService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  public async login({ email, password }: ILogin): Promise<ServiceResponse<{ token: string }>> {
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
