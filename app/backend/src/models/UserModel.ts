import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  public async find(id: number): Promise<SequelizeUser | null> {
    const user = await this.model.findByPk(id);
    return user;
  }

  public async findByEmail(email: string): Promise<SequelizeUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
