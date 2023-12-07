interface IRead<T, T2> {
  find(id: number): Promise<T>;
  list(): Promise<T2>;
}

interface IWrite<T, T2> {
  create(item: T): Promise<T2>;
  update(id: number, item: T): Promise<T2>;
}

interface IDelete {
  delete(id: number): Promise<void>;
}

export default interface ICRUD<
  FindTypeReturn,
  ListTypeReturn,
  WriteTypeParam,
  WriteTypeReturn,
> extends
  IRead<FindTypeReturn, ListTypeReturn>,
  IWrite<WriteTypeParam, WriteTypeReturn>,
  IDelete
{}
