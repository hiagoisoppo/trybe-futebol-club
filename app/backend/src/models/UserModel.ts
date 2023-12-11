import { IUserModel } from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import { UserLessId } from '../Interfaces/User/UserLessId';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async find(id: number): Promise<SequelizeUser | null> {
    const user = await this.model.findByPk(id);
    return user;
  }

  public async list(): Promise<SequelizeUser[]> {
    const users = await this.model.findAll({ attributes: { exclude: ['password'] } });
    return users;
  }

  public async create(user: UserLessId): Promise<SequelizeUser> {
    const newUser = await this.model.create(user);
    return newUser;
  }

  public async update(id: number, user: UserLessId): Promise<SequelizeUser | null> {
    await this.model.update(user, { where: { id } });
    const updatedUser = await this.model.findByPk(id);
    return updatedUser;
  }

  public async delete(id: number): Promise<number> {
    const deletedId = await this.model.destroy({ where: { id } });
    return deletedId;
  }

  public async findByEmail(email: string): Promise<SequelizeUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
