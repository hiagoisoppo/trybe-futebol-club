export interface ICreate<T> {
  create(data: Partial<T>): Promise<T>;
}

export interface IRead<T> {
  find(id: number): Promise<T | null>;
  list(): Promise<T[]>;
}

export interface IUpdate<T> {
  update(id: number, data: Partial<T>): Promise<T | null>;
}

export interface IDelete {
  delete(id: number): Promise<number>;
}

export default interface ICRUD<T> extends
  IRead<T>, ICreate<T>, IUpdate<T>, IDelete
{}
