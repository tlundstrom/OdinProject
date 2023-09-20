import { ITodoInput } from "./ITodoInput";

export interface ITodoOutput extends ITodoInput {
  _id: string;
  projectId: string;
}
