import { ICreateService, IUpdateService, IDelete } from '../CRUD/ICRUDService';
import IUser from './IUser';

export interface IUserService extends ICreateService<IUser>, IUpdateService<IUser>, IDelete {}
