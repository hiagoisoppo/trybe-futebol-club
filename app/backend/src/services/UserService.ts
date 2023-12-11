import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import IUser from '../Interfaces/User/IUser';
import CustomError from '../utils/CustomError';
import { UserLessId } from '../Interfaces/User/UserLessId';
import { IUserService } from '../Interfaces/User/IUserService';

export default class UserService implements IUserService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  public async create(user: UserLessId): Promise<ServiceResponse<IUser>> {
    const userFound = await this.userModel.findByEmail(user.email);
    if (userFound) throw new CustomError('User already exists', 400);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const newUser = await this.userModel.create({ ...user, password: hash });
    return { statusCode: 201, data: newUser.dataValues };
  }

  public async update(id: number, user: UserLessId): Promise<ServiceResponse<IUser>> {
    const userFound = await this.userModel.find(id);
    if (!userFound) throw new CustomError('User not found', 404);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const updatedUser = await this.userModel.update(id, { ...user, password: hash });
    if (!updatedUser) throw new CustomError('Internal server error', 500);

    return { statusCode: 200, data: updatedUser.dataValues };
  }

  public async delete(id: number): Promise<ServiceResponse<null>> {
    const user = await this.userModel.find(id);
    if (!user) throw new CustomError('Non-existent id', 400);

    await this.userModel.delete(id);
    return { statusCode: 204, data: null };
  }
}
