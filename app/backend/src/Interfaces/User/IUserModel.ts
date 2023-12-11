import SequelizeUser from '../../database/models/SequelizeUser';
import ICRUD from '../CRUD/ICRUDModel';

export type IUserModel = ICRUD<SequelizeUser>;
