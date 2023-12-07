import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/Team/ITeam';
import ICRUD from '../Interfaces/ICRUD';
import CustomError from '../utils/CustomError';

export default class TeamModel implements ICRUD<ITeam, ITeam[], string, ITeam> {
  private model = SequelizeTeam;

  public async find(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    if (!team) throw new CustomError('Team not found', 404);
    return team.dataValues;
  }

  public async list(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    if (!teams) throw new CustomError('Internal server error', 500);
    return teams;
  }

  public async create(teamName: string): Promise<ITeam> {
    const team = await this.model.findOne({ where: { teamName } });
    if (team) throw new CustomError('Team already exists', 400);

    const newTeam = await this.model.create({ teamName });
    return newTeam.dataValues;
  }

  public async update(id: number, teamName: string): Promise<ITeam> {
    await this.model.update({ teamName }, { where: { id } });
    const team = await this.model.findByPk(id);
    if (!team) throw new CustomError('Team not found', 404);
    return team.dataValues;
  }

  public async delete(id: number): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
