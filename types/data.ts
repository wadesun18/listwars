export interface List {
  listName: string;
  tasks: Array<{item: string; details: string; assignee: Array<string>}>;
}
