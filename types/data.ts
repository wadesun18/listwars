export interface List {
  listName: string;
  tasks: Array<{title: string; details: string; whodunnit: Array<string>}>;
}

export interface Task {
  id: string;
  title: string;
  details: string;
  whodunnit: string;
  status: string;
}

export type Tasks = Task[];
