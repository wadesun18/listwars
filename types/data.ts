export interface List {
  listName: string;
  tasks: Array<{item: string; details: string; whodunnit: Array<string>}>;
}

export interface Task {
  id: string;
  item: string;
  details: string;
  whodunnit: Array<string>;
  status: string;
}

export type Tasks = Task[];
