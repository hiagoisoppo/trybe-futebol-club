import { ICreateService, IUpdateService } from '../CRUD/ICRUDService';
import { ServiceResponse } from '../ServiceResponse';
import IMatch from './IMatch';

export interface IMatchService
  extends ICreateService<IMatch>, IUpdateService<IMatch> {
  find(id: number): Promise<ServiceResponse<IMatch>>;
  list(inProgress: string): Promise<ServiceResponse<IMatch[]>>;
}
