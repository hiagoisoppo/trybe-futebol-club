import SequelizeMatch from '../../database/models/SequelizeMatch';
import { ICreate, IRead, IUpdate } from '../CRUD/ICRUDModel';

export interface IMatchModel
  extends ICreate<SequelizeMatch>, IRead<SequelizeMatch>, IUpdate<SequelizeMatch> {}
