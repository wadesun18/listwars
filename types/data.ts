export interface List {
  listName: string;
  tasks: Array<{
    id: string;
    status: string;
    title: string;
    details: string;
    whodunnit: string;
  }>;
}

export interface Task {
  id: string;
  title: string;
  details: string;
  whodunnit: string;
  status: string;
}

export type Tasks = Task[];
