import SequelizeTeam from '../../database/models/SequelizeTeam';
import ICRUD from '../CRUD/ICRUDModel';

export type ITeamModel = ICRUD<SequelizeTeam>;
