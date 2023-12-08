import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/Team/ITeam';
import CustomError from '../utils/CustomError';
import { TeamLessId } from '../Interfaces/Team/TeamLessId';
import { ITeamService } from '../Interfaces/Team/ITeamService';

export default class TeamService implements ITeamService {
  private teamModel: TeamModel;
  constructor() {
    this.teamModel = new TeamModel();
  }

  public async find(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.find(id);
    if (!team) throw new CustomError('Team not found', 404);
    return { statusCode: 200, data: team.dataValues };
  }

  public async list(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.list();
    return { statusCode: 200, data: teams };
  }

  public async create({ teamName }: TeamLessId): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findByName(teamName);
    if (team) throw new CustomError('Team already exists', 400);

    const newTeam = await this.teamModel.create({ teamName });
    return { statusCode: 201, data: newTeam.dataValues };
  }

  public async update(id: number, { teamName }: TeamLessId): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.find(id);
    if (!team) throw new CustomError('Team not found', 404);

    const updatedTeam = await this.teamModel.update(id, { teamName });
    if (!updatedTeam) throw new CustomError('Internal server error', 500);

    return { statusCode: 200, data: updatedTeam.dataValues };
  }

  public async delete(id: number): Promise<ServiceResponse<null>> {
    const team = await this.teamModel.find(id);
    if (!team) throw new CustomError('Non-existent id', 400);

    await this.teamModel.delete(id);
    return { statusCode: 204, data: null };
  }
}
