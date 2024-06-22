export interface IStateTable {
  title: string;
  columns: IStateColumn[];
  rows: IStateRow[];
}
export interface IStateColumn {
  title: string;
  value: string;
}
export interface IStateRow {
  title: string;
  value: string;
}
