import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { TeamLessId } from '../Interfaces/Team/TeamLessId';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async find(id: number): Promise<SequelizeTeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }

  public async list(): Promise<SequelizeTeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async create({ teamName }: TeamLessId): Promise<SequelizeTeam> {
    const newTeam = await this.model.create({ teamName });
    return newTeam;
  }

  public async update(id: number, { teamName }: TeamLessId): Promise<SequelizeTeam | null> {
    await this.model.update({ teamName }, { where: { id } });
    const updatedTeam = await this.model.findByPk(id);
    return updatedTeam;
  }

  public async delete(id: number): Promise<number> {
    const deletedId = await this.model.destroy({ where: { id } });
    return deletedId;
  }

  public async findByName(teamName: string): Promise<SequelizeTeam | null> {
    const team = await this.model.findOne({ where: { teamName } });
    return team;
  }
}
