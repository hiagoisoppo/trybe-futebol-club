import IUser from './IUser';

export type UserLessPassword = Omit<IUser, 'password'>;
