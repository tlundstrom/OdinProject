export interface ITaskInput {
  title: string;
  description: string;
  dueDate: Date;
  complete: boolean;
  projectId?: string;
}
