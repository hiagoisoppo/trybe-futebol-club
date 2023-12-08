import { ServiceResponse } from '../ServiceResponse';

export interface ICreateService<T> {
  create(data: Partial<T>): Promise<ServiceResponse<T>>;
}

export interface IReadService<T> {
  find(id: number): Promise<ServiceResponse<T>>;
  list(): Promise<ServiceResponse<T[]>>;
}

export interface IUpdateService<T> {
  update(id: number, data: Partial<T>): Promise<ServiceResponse<T>>;
}

export interface IDelete {
  delete(id: number): Promise<ServiceResponse<null>>;
}

export default interface ICRUDService<T> extends
  IReadService<T>, ICreateService<T>, IUpdateService<T>, IDelete
{}
