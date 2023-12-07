import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ICRUD from '../Interfaces/ICRUD';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/Team/ITeam';

export default class TeamService
implements ICRUD<
ServiceResponse<ITeam>,
ServiceResponse<ITeam[]>,
string,
ServiceResponse<ITeam>
> {
  private teamModel: TeamModel;
  constructor() {
    this.teamModel = new TeamModel();
  }

  public async find(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.find(id);
    return { statusCode: 200, data: team };
  }

  public async list(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.list();
    return { statusCode: 200, data: teams };
  }

  public async create(item: string): Promise<ServiceResponse<ITeam>> {
    throw new Error('Method not implemented.');
  }

  public async update(id: number, item: string): Promise<ServiceResponse<ITeam>> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}